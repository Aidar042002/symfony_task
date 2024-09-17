<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Author;
use App\Repository\AuthorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Serializable;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/authors', name: 'author_api')]
class AuthorController extends AbstractController
{

    /**
     * Получения списка всех авторов
     */

    #[Route('', name: 'author_index', methods: ['GET'])]
    public function index(AuthorRepository $authorRepository, SerializerInterface $serializer): Response
    {
        $authors = $authorRepository->findAll();
        $data = $serializer->serialize($authors, 'json', ['groups' => 'author:read']);

        return new Response($data, 200, ['Content-Type' => 'application/json']);
    }

    /**
     * Создание автора
     */

    #[Route('', name: 'author_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, AuthorRepository $authorRepository): Response
    {
        $requestData = $request->getContent();

        $author = $serializer->deserialize($requestData, Author::class, 'json');

        if (!$author->getLastName() || !$author->getFirstName() || !$author->getMiddleName()) {
            return new JsonResponse(['error' => "Незаполнены все поля"], 400);
        }

        $existAuthor = $authorRepository->findOneBy([
              'lastName'=>$author->getLastName(),
              'firstName'=>$author->getFirstName(),
              'middleName'=>$author->getMiddleName()  
        ]);
        if($existAuthor){
            return new JsonResponse(['error'=>'Автор с таким именем уже существует'], 400);
        }

        $entityManager->persist($author);
        $entityManager->flush();

        $data = $serializer->serialize($author, 'json', ['groups' => 'author:read']);

        return new JsonResponse(['message' => 'Автор создан', 'author' => json_decode($data)], 200);
    }

    /**
     * Данные одного автора
     */

    #[Route('/{id}', name: 'author_show', methods: ['GET'])]
    public function show(int $id, AuthorRepository $authorRepository, SerializerInterface $serializer): Response
    {
        $author = $authorRepository->find($id);

        if (!$author) {
            return new JsonResponse(['error' => 'Автор не найден'], 404);
        }

        $data = $serializer->serialize($author, 'json', ['groups' => 'author:read']);

        return new Response($data, 200, ['Content-Type' => 'application/json']);
    }

    /**
     * Обнолвние автора
     */

    #[Route('/{id}', name: 'author_update', methods: ['PUT'])]
    public function update(int $id, Request $request, AuthorRepository $authorRepository, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $author = $authorRepository->find($id);

        if (!$author) {
            return new JsonResponse(['error' => 'Автор не найден'], 404);
        }

        $requestData = $request->getContent();
        
        $updatedAuthor = $serializer->deserialize($requestData, Author::class, 'json', ['object_to_populate' => $author]);

        if (!$updatedAuthor->getLastName() || !$updatedAuthor->getFirstName() || !$updatedAuthor->getMiddleName()) {
            return new JsonResponse(['error' => 'Незаполнены все поля'], 400);
        }

        $existAuthor = $authorRepository->findOneBy([
            'lastName'=>$author->getLastName(),
            'firstName'=>$author->getFirstName(),
            'middleName'=>$author->getMiddleName()  
        ]);
        if($existAuthor){
            return new JsonResponse(['error'=>'Автор с таким именем уже существует'], 400);
        }

        $entityManager->persist($updatedAuthor);
        $entityManager->flush();

        $data = $serializer->serialize($updatedAuthor, 'json', ['groups' => 'author:read']);

        return new JsonResponse(['message' => 'Автор обновлен', 'author' => json_decode($data)], 200);
    }

    /**
     * Удаление автора
     */

    #[Route('/{id}', name: 'author_delete', methods: ['DELETE'])]
    public function delete(int $id, AuthorRepository $authorRepository, EntityManagerInterface $entityManager): Response
    {
        $author = $authorRepository->find($id);

        if (!$author) {
            return new JsonResponse(['error' => 'Автор не найден'], 404);
        }

        $entityManager->remove($author);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Автор удален'], 200);
    }


}
