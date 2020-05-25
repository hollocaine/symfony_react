import React, { Component, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function TodoTable() {
  const context = useContext(TodoContext);
  return (
    <div>
      {context.todos.map((todo) => (
        <div>{todo.task}</div>
      ))}
    </div>
  );
}

export default TodoTable;
