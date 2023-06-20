const QUERY = {
  SELECT_PHOTOS: "SELECT * FROM Photos WHERE albumId = ?",
  SELECT_PHOTO: "SELECT * FROM Photos WHERE id = ? AND albumId = ?",
  CREATE_PHOTO:
    "INSERT INTO Photos(albumId, title, url, thumbnailUrl) VALUES (?, ?, ?, ?)",
  UPDATE_PHOTO:
    "UPDATE Photos SET title = ?, url = ?, thumbnailUrl = ? WHERE id = ? AND albumId = ?",
  DELETE_PHOTO: "DELETE FROM Photos WHERE id = ? AND albumId = ?",
};

export default QUERY;
