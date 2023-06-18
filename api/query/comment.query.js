const QUERY = {
  SELECT_COMMENTS: "SELECT * FROM Comments",
  SELECT_COMMENT: "SELECT * FROM Comments WHERE id = ?",
  CREATE_COMMENT: "INSERT INTO Comments(userId, postId, body) VALUES (?, ?, ?)",
  UPDATE_COMMENT:
    "UPDATE Comments SET postId = ?, body = ? WHERE id = ? AND userId = ?",
  DELETE_COMMENT: "DELETE FROM Comments WHERE id = ? AND userId = ?",
};

export default QUERY;
