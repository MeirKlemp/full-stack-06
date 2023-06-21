const QUERY = {
  SELECT_COMMENTS: "SELECT Comments.*, Users.username, Users.email FROM Comments INNER JOIN Users ON Comments.userId = Users.id",
  SELECT_COMMENT: "SELECT Comments.*, Users.username, Users.email FROM Comments INNER JOIN Users ON Comments.userId = Users.id WHERE Comments.id = ?",
  CREATE_COMMENT: "INSERT INTO Comments(userId, postId, body) VALUES (?, ?, ?)",
  UPDATE_COMMENT:
    "UPDATE Comments SET postId = ?, body = ? WHERE id = ? AND userId = ?",
  DELETE_COMMENT: "DELETE FROM Comments WHERE id = ? AND userId = ?",
};

export default QUERY;
