<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;


#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["author:read", "book:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["author:read", "book:read"])]
    private ?string $title = null;

    #[ORM\Column]
    #[Groups(["author:read", "book:read"])]
    private ?int $year = null;

    #[ORM\Column(length: 13)]
    #[Groups(["author:read", "book:read"])]
    private ?string $isbn = null;

    #[ORM\Column]
    #[Groups(["author:read", "book:read"])]
    private ?int $pages = null;

    #[ORM\ManyToMany(targetEntity: Author::class, inversedBy:'books')]
    #[ORM\JoinTable(name: 'book_authors')]
    #[Groups(["author:read", "book:read"])]
    private Collection $authors;

    public function __construct()
    {
        $this->authors = new ArrayCollection();
    }

    public function getAuthors(): Collection
    {
    return $this->authors;
    }

    public function setAuthors(Collection $authors):static
    {
        $this->authors=$authors;
        return $this;
    }

    public function addAuthors(Author $authors)
    {
        $this->authors = $authors;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getIsbn(): ?string
    {
        return $this->isbn;
    }

    public function setIsbn(string $isbn): static
    {
        $this->isbn = $isbn;

        return $this;
    }

    public function getPages(): ?int
    {
        return $this->pages;
    }

    public function setPages(int $pages): static
    {
        $this->pages = $pages;

        return $this;
    }

}
