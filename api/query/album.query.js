const QUERY = {
  SELECT_ALBUMS: "SELECT * FROM Albums WHERE userId = ?",
  SELECT_ALBUM: "SELECT * FROM Albums WHERE id = ? AND userId = ?",
  CREATE_ALBUM: "INSERT INTO Albums(userId, title) VALUES (?, ?)",
  UPDATE_ALBUM: "UPDATE Albums SET title = ? WHERE id = ? AND userId = ?",
  DELETE_ALBUM: "DELETE FROM Albums WHERE id = ? AND userId = ?",
};

export default QUERY;
