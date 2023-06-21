const QUERY = {
  SELECT_PHOTOS:
    "SELECT * FROM Photos",
  SELECT_PHOTO:
    "SELECT * FROM Photos WHERE id = ? AND albumId IN (SELECT id FROM Albums WHERE userId = ?)",
  CREATE_PHOTO:
    "INSERT INTO Photos(albumId, title, url, thumbnailUrl) SELECT a.id, ?, ?, ? FROM Albums a WHERE a.id = ? AND a.userId = ?",
  UPDATE_PHOTO:
    "UPDATE Photos SET title = ?, url = ?, thumbnailUrl = ? WHERE id = ? AND albumId IN (SELECT id FROM Albums WHERE userId = ?)",
  DELETE_PHOTO:
    "DELETE FROM Photos WHERE id = ? AND albumId IN (SELECT id FROM Albums WHERE userId = ?)",
};

export default QUERY;
