import { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [status, setStatus] = useState("all");

  const todoTitleHandler = (event) => {
    setTodoTitle(event.target.value);
  };
  const addTodo = (event) => {
    event.preventDefault();
    if (todoTitle) {
      let newTodo = {
        id: todos.length + 1,
        completed: false,
        title: todoTitle,
      };
      setTodos([...todos, newTodo]);
      setTodoTitle("");
    }
  };

  const editTodo = (id) => {
    let newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    setTodos([...newTodos]);
  };

  const removeTodo = (id) => {
    let newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos([...newTodos]);
  };
  const statusHandler = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Header />
      <form>
        <input
          onChange={todoTitleHandler}
          type="text"
          className="todo-input"
          maxLength="40"
          value={todoTitle}
        />
        <button onClick={addTodo} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          {status === "all" &&
            todos.map((todo) => (
              <Todo
                removeTodo={removeTodo}
                editTodo={editTodo}
                {...todo}
                key={todo.id}
              />
            ))}
          {status === "uncompleted" &&
            todos.map(
              (todo) =>
                !todo.completed && (
                  <Todo
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    {...todo}
                    key={todo.id}
                  />
                ),
            )}
          {status === "completed" &&
            todos.map(
              (todo) =>
                todo.completed && (
                  <Todo
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    {...todo}
                    key={todo.id}
                  />
                ),
            )}
        </ul>
      </div>
    </>
  );
}
