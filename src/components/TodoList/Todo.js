import React, { Component } from "react";

export default class Todo extends Component {
  render() {
    return (
      <div
        className={`todo ${this.props.completed && "completed"}`}
        style={{ display: "flex" }}
      >
        <li className="todo-item">{this.props.title}</li>

        <button
          onClick={this.props.editTodo.bind(this, this.props.id)}
          className="check-btn"
        >
          <i className="fas fa-check" aria-hidden="true"></i>
        </button>

        <button
          onClick={this.props.removeTodo.bind(this, this.props.id)}
          className="trash-btn"
        >
          <i className="fas fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}
