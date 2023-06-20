const QUERY = {
  SELECT_USERS: "SELECT * FROM Users",
  SELECT_USER_BY_ID: "SELECT * FROM Users WHERE id = ?",
  SELECT_USER_BY_USERNAME: "SELECT * FROM Users WHERE username = ?",
  SELECT_USER_BY_USERNAME_OR_EMAIL:
    "SELECT * FROM Users WHERE username = ? OR email = ?",
  CREATE_USER: "INSERT INTO Users(name, username, email) VALUES (?, ?, ?)",
  UPDATE_USER_BY_ID:
    "UPDATE Users SET name = ?, username = ?, email = ? WHERE id = ?",
  UPDATE_USER_BY_USERNAME:
    "UPDATE Users SET name = ?, username = ?, email = ? WHERE username = ?",
  DELETE_USER: "DELETE FROM Users WHERE id = ?",
  CREATE_PASSWORD: "INSERT INTO Passwords(userId, password) VALUES (?, ?)",
  UPDATE_PASSWORD: "UPDATE Passwords SET password = ? WHERE userId = ?",
  DELETE_PASSWORD: "DELETE FROM Passwords WHERE userId = ?",
  DELETE_APIKEYS: "DELETE FROM ApiKeys WHERE userId = ?",
};

export default QUERY;
