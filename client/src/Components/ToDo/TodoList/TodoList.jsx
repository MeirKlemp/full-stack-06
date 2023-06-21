import { TodoItem } from "../TodoItem/TodoItem.jsx";
import "./TodoList.css";

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="Todo-List">
      {todos.length === 0 && "No Todos"}
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
