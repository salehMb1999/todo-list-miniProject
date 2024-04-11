import React, { Component } from "react";
import Header from "./Header";
import Todo from "./Todo";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoTitle: "",
      status: "all",
    };

    this.todoTitleHandler = this.todoTitleHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.statusHandler = this.statusHandler.bind(this)
  }

  todoTitleHandler(event) {
    this.setState({
      todoTitle: event.target.value,
    });
  }
  addTodo(event) {
    event.preventDefault();
    if (this.state.todoTitle) {
      let newTodo = {
        id: this.state.todos.length + 1,
        completed: false,
        title: this.state.todoTitle,
      };
      this.setState({
        todos: [...this.state.todos, newTodo],
        todoTitle: "",
      });
    }
  }

  editTodo(id) {
    let newTodos = [...this.state.todos];
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    this.setState({
      todos: [...newTodos],
    });
  }
  removeTodo(id) {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: [...newTodos],
    });
  }
  statusHandler (event) {
    this.setState({
        status : event.target.value
    })
  }
  render() {
    return (
      <>
        <Header />
        <form>
          <input
            onChange={this.todoTitleHandler}
            type="text"
            className="todo-input"
            maxLength="40"
            value={this.state.todoTitle}
          />
          <button onClick={this.addTodo} className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
            <select onChange={this.statusHandler} name="todos" className="filter-todo">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </form>

        <div className="todo-container">
          <ul className="todo-list">
            {this.state.status === "all" && this.state.todos.map((todo) => (
              <Todo
                removeTodo={this.removeTodo}
                editTodo={this.editTodo}
                {...todo}
                key={todo.id}
              />
            ))}
            {this.state.status === "uncompleted"&& this.state.todos.map((todo) => (
              !todo.completed && <Todo
              removeTodo={this.removeTodo}
              editTodo={this.editTodo}
              {...todo}
              key={todo.id}
            />
            ))}
            {this.state.status === "completed" && this.state.todos.map((todo) => (
              todo.completed && <Todo
              removeTodo={this.removeTodo}
              editTodo={this.editTodo}
              {...todo}
              key={todo.id}
            />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
