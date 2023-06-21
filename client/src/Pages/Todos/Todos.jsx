import { useEffect, useState, useContext } from "react";
import { NewTodoForm } from "../../Components/ToDo/NewTodoForm/NewTodoForm.jsx";
import "./TodosStyle.css";
import { TodoList } from "../../Components/ToDo/TodoList/TodoList.jsx";
import ComboBoxSort from "../../Components/ToDo/ComboBoxSort/ComboBoxSort.jsx";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api";

export function Todos() {
  const { userId, apiKey } = useContext(UserInfoContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    apiFetch(`todos?userId=${userId}`, "GET", apiKey).then((data) =>
      setTodos(data.data.todos)
    );
  }, []);

  function addTodo(title) {
    apiFetch("todos", "POST", apiKey, {
      title,
      completed: 0,
    })
      .then((response) => {
        setTodos((currentTodos) => [...currentTodos, response.data.todo]);
      })
      .catch((err) => alert("Couldn't create a new Todo... Please try again."));
  }

  // function sortById() that sorts the todos by id
  function sortById() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort((a, b) => a.id - b.id);
      return sortedTodos;
    });
  }

  // function sortByTitle() that sorts the todos by title
  function sortByTitle() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return sortedTodos;
    });
  }

  // function sortByCompleted() that sorts the todos by completed
  function sortByCompleted() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort(
        (a, b) => a.completed - b.completed
      );
      return sortedTodos;
    });
  }

  // function sortByRandom() that sorts the todos randomly
  function sortByRandom() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort(() => Math.random() - 0.5);
      return sortedTodos;
    });
  }

  function toggleTodo(todo) {
    apiFetch(`todos/${todo.id}`, "PUT", apiKey, {
      title: todo.title,
      completed: todo.completed,
    }).catch((err) =>
      alert("Couldn't update the Todo... Please refresh the page.")
    );

    setTodos((currentTodos) => {
      return currentTodos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
    });
  }

  function deleteTodo(id) {
    apiFetch(`todos/${id}`, "DELETE", apiKey).catch((err) =>
      alert("Couldn't delete the Todo... Please refresh the page.")
    );

    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <main>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <ComboBoxSort
        SortById={sortById}
        SortByTitle={sortByTitle}
        SortByComplited={sortByCompleted}
        RandomSort={sortByRandom}
      />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </main>
  );
}

export default Todos;
