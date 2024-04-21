export default function Todo(props) {
  return (
    <div
      className={`todo ${props.completed && "completed"}`}
      style={{ display: "flex" }}
    >
      <li className="todo-item">{props.title}</li>

      <button
        onClick={() => {
          props.editTodo(props.id);
        }}
        className="check-btn"
      >
        <i className="fas fa-check" aria-hidden="true"></i>
      </button>

      <button
        onClick={() => {
          props.removeTodo(props.id);
        }}
        className="trash-btn"
      >
        <i className="fas fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  );
}
