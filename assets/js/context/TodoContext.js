import React, {
  Component,
  createContext,
  setState,
  useState
} from 'react';
export const TodoContext = createContext();

class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{
          id: 1,
          name: 'do this'
        },
        {
          id: 2,
          name: 'do this2'
        },
        {
          id: 3,
          name: 'do this3'
        },
        {
          id: 4,
          name: 'do this4'
        },
        {
          id: 5,
          name: 'do this5'
        },
        {
          id: 6,
          name: 'do this6'
        },
      ],
    };
  }
  //create
  createTodo(event, todo) {
    event.preventDefault();
    let data = [...this.state.todos];
    data.push(todo);
    this.setState({
      todos: data,
    });
  }
  //read
  readTodo() {}
  //update
  updateTodo(data) {
    let todos = [...this.state.todos];
    let todo = todos.find((todo) => {
      return todo.id === data.id;
    });
    todo.name = data.name;
    this.setState({
      todos,
    });
  }
  //delete

  deleteTodo(data) {
    let todos = [...this.state.todos];
    let todo = todos.find((todo) => {
      return todo.id === data.id;
    });
    todos.splice(todos.indexOf(todo), 1);
    this.setState({
      todos,
    });
  }

  render() {
    return ( <
      TodoContext.Provider value = {
        {
          ...this.state,
          createTodo: this.createTodo.bind(this),
          updateTodo: this.updateTodo.bind(this),
          deleteTodo: this.deleteTodo.bind(this),
        }
      } >
      {
        this.props.children
      } <
      /TodoContext.Provider>
    );
  }
}
export default TodoContextProvider;