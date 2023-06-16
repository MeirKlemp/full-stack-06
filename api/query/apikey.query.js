const QUERY = {
  SELECT_APIKEYS:
    "SELECT BIN_TO_UUID(apiKey) as apiKey, userId, created_at FROM ApiKeys WHERE userId = ? ORDER BY created_at",
  SELECT_APIKEY:
    "SELECT BIN_TO_UUID(apiKey) as apiKey, userId, created_at FROM ApiKeys WHERE apiKey = UUID_TO_BIN(?)",
  CREATE_APIKEY:
    "INSERT INTO ApiKeys (apiKey, userId) VALUES (UUID_TO_BIN(UUID()), ?)",
  DELETE_APIKEYS: "DELETE FROM ApiKeys WHERE userId = ?",
  DELETE_APIKEY: "DELETE FROM ApiKeys WHERE apiKey = UUID_TO_BIN(?)",
  SELECT_USERID_WITH_PASSWORD:
    "SELECT userId FROM Passwords p INNER JOIN Users u " +
    "ON u.id = p.userId WHERE username = ? AND password = ?",
};

export default QUERY;
