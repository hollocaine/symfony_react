<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Todo;
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
    /**
     * @Route("/create", name="api_todo_create")
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request) {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);
        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json([
               'todo' => $todo->toArray(),
            ]);
        } catch (Exception $exception) {
            //error message
        }
    }
}
