import "./TodoItem.css";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li className="Todo-List-Item">
      <label className="Todo-Item-Label">
        <input
          className="Todo-Item-Checkbox"
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="Todo-Btn Btn-Danger">
        Delete
      </button>
    </li>
  );
}
