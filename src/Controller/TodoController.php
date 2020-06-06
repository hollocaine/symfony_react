<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
/**
 * @Route("/api/todo", name="todo")
 */
class TodoController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var TodoRepository
     */
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/read", name="todo")
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();
        $arrayToDos = [];
        foreach ($todos as $todo) {
            $arrayToDos[] = $todo->toArray();
        }
        return $this->json($arrayToDos);
    }
}
