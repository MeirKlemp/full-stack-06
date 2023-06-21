import "./TodoItem.css";

export function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="Todo-List-Item">
      <label className="Todo-Item-Label">
        <input
          className="Todo-Item-Checkbox"
          type="checkbox"
          checked={Boolean(todo.completed)}
          onChange={(e) =>
            toggleTodo({ ...todo, completed: +e.target.checked })
          }
        />
        {todo.title}
      </label>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="Todo-Btn Btn-Danger"
      >
        Delete
      </button>
    </li>
  );
}
