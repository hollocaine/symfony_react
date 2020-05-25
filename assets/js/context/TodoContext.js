import React, { Component, createContext } from 'react';
export const TodoContext = createContext();

class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { task: 'do this' },
        { task: 'do this2' },
        { task: 'do this3' },
        { task: 'do this4' },
        { task: 'do this5' },
        { task: 'do this6' },
      ],
    };
  }
  //create
  createTodo() {}
  //read
  readTodo() {}
  //update
  updateTodo() {}
  //delete
  deleteTodo() {}

  render() {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          createTodo: this.createTodo.bind(this),
          updateTodo: this.updateTodo.bind(this),
          deleteTodo: this.deleteTodo.bind(this),
        }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}
export default TodoContextProvider;
