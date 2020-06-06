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
     * @Route("/create", name="api_todo_create", methods={"POST"})
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
    /**
     * @Route("/read", name="api_todo_read", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
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
     * @Route("/update/{id}", name="api_todo_update", methods={"PUT"})
     * @param Request $request
     * @param Todo  $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());
        $todo->setName($content->name);
        try {
            $this->entityManager->flush();
             return $this->json([
            'message' => "Todo has been updated",
        ]);
        } catch (Exception $exception) {
            //error message
        }
       
    }
    /**
     * @Route("/delete/{id}", name="api_todo_delete", methods={"DELETE"})
     * @param Todo  $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error message
        }
        return $this->json([
               'message' => "Todo has been deleted",
        ]);
    }
}
   
