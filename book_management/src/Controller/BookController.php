<?php

namespace App\Controller;

use App\Entity\Author;
use App\Entity\Book;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\Common\Collections\ArrayCollection;

#[Route('/books', name: 'book_api')]
class BookController extends AbstractController
{

    /**
     * Создание книги
     */

    #[Route('', name: 'book_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, BookRepository $bookRepository): Response
    {

        $requestData = $request->getContent();
        $data = json_decode($requestData, true);

        $requiredFields = ['title', 'year', 'isbn', 'pages', 'authors'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return new JsonResponse(['error' => 'Не заполнены все поля'], 400);
            }
        }
    
        $book = new Book();
        $book->setTitle($data['title']);
        $book->setYear($data['year']);
        $book->setIsbn($data['isbn']);
        $book->setPages($data['pages']);
        $authorIds = $data['authors'];

        if (!empty($authorIds)) {

            $authors = $entityManager->getRepository(Author::class)->findBy(['id' => $authorIds]);
        
            if (count($authors) !== count($authorIds)) {
                return new JsonResponse(['error' => 'Авторы не найдены'], 400);
            }
        
            $book->setAuthors(new ArrayCollection($authors));
        }

        $sameTitleAndIsbn = $bookRepository->findOneBy([
            'title' =>$book->getTitle(),
            'isbn' =>$book->getIsbn()
        ]);

        if($sameTitleAndIsbn){
            return new JsonResponse(['error'=>'Книга с таким именем и isbn уже существует'],400);
        }

        $sameTitleAndYear = $bookRepository->findOneBy([
            'title' =>$book->getTitle(),
            'year' =>$book->getYear()
        ]);

        if($sameTitleAndYear){
            return new JsonResponse(['error'=>'Книга с таким именем и годом уже существует'], 400);
        }

        $entityManager->persist($book);
        $entityManager->flush();
    
        $data = $serializer->serialize($book, 'json', ['groups' => 'author:read']);
        $bookData = json_decode($data, true); 

        return new JsonResponse(['message' => 'Книга создана', 'book' => $bookData], 200);
    }

    /**
     * Данные одного автора
     */

    #[Route('/{id}', name: 'book_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $book = $entityManager->getRepository(Book::class)->find($id);

        if (!$book) {
            return new JsonResponse(['error' => 'Книга не найдена'], 404);
        }

        $data = $serializer->serialize($book, 'json', ['groups' => 'author:read']);
        return new JsonResponse(json_decode($data), 200);
    }

    /**
     * Список всех авторов
     */

    #[Route('', name: 'book_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $books = $entityManager->getRepository(Book::class)->findAll();

        $data = $serializer->serialize($books, 'json', ['groups' => 'author:read']);
        return new JsonResponse(json_decode($data), 200);
    }

    /**
     * Обновление автора
     */

    #[Route('/{id}', name: 'book_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, BookRepository $bookRepository): Response
    {
        $book = $entityManager->getRepository(Book::class)->find($id);

        if (!$book) {
            return new JsonResponse(['error' => 'Книга не найдена'], 404);
        }

        $requestData = $request->getContent();
        $data = json_decode($requestData, true);

        $requiredFields = ['title', 'year', 'isbn', 'pages', 'authors'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return new JsonResponse(['error' => "Не заполнены все поля"], 400);
            }
        }

        $book->setTitle($data['title']);
        $book->setYear($data['year']);
        $book->setIsbn($data['isbn']);
        $book->setPages($data['pages']);

        $authorIds = $data['authors'];
        if (!empty($authorIds)) {
            $authors = $entityManager->getRepository(Author::class)->findBy(['id' => $authorIds]);

            if (count($authors) !== count($authorIds)) {
                return new JsonResponse(['error' => 'Авторы не найдены'], 400);
            }

            $book->setAuthors(new ArrayCollection($authors));
        }

        $sameTitleAndIsbn = $bookRepository->findOneBy([
            'title' =>$book->getTitle(),
            'isbn' =>$book->getIsbn()
        ]);

        if($sameTitleAndIsbn){
            return new JsonResponse(['error'=>'Книга с таким именем и isbn уже существует'],400);
        }

        $sameTitleAndYear = $bookRepository->findOneBy([
            'title' =>$book->getTitle(),
            'year' =>$book->getYear()
        ]);

        if($sameTitleAndYear){
            return new JsonResponse(['error'=>'Книга с таким именем и годом уже существует'], 400);
        }

        $entityManager->flush();

        $data = $serializer->serialize($book, 'json', ['groups' => 'author:read']);
        return new JsonResponse(json_decode($data), 200);
    }

    /**
     * Удаление автора
     */

    #[Route('/{id}', name: 'book_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $book = $entityManager->getRepository(Book::class)->find($id);

        if (!$book) {
            return new JsonResponse(['error' => 'Книга не найдена'], 404);
        }

        $entityManager->remove($book);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Книга удалена'], 200);
    }

}
