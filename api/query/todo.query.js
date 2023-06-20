const QUERY = {
    SELECT_TODOS: "SELECT * FROM Todos WHERE userId = ?",
    SELECT_TODO: "SELECT * FROM Todos WHERE id = ? AND userId = ?",
    CREATE_TODO: "INSERT INTO Todos(userId, title, completed) VALUES (?, ?, ?)",
    UPDATE_TODO: "UPDATE Todos SET title = ?, completed = ? WHERE id = ? AND userId = ?",
    DELETE_TODO: "DELETE FROM Todos WHERE id = ? AND userId = ?",
  };
  
  export default QUERY;
  