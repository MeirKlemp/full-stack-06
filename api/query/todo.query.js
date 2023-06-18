const QUERY = {
    SELECT_TODOS: "SELECT * FROM Todos WHERE userId = ?",
    SELECT_TODO: "SELECT * FROM Todos WHERE id = ? AND userId = ?",
    CREATE_TODO: "INSERT INTO Todos(userId, postId, body) VALUES (?, ?, ?)",
    UPDATE_TODO: "UPDATE Todos SET postId = ?, body = ? WHERE id = ? AND userId = ?",
    DELETE_TODO: "DELETE FROM Todos WHERE id = ? AND userId = ?",
  };
  
  export default QUERY;
  