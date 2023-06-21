const QUERY = {
    SELECT_POSTS: 'SELECT * FROM Posts',
    SELECT_POST: 'SELECT * FROM Posts WHERE id = ?',
    CREATE_POST: 'INSERT INTO Posts(userId, title, body) VALUES (?, ?, ?)',
    UPDATE_POST: 'UPDATE Posts SET title = ?, body = ? WHERE id = ? AND userId = ?',
    DELETE_POST: 'DELETE FROM Posts WHERE id = ? AND userId = ?',
    DELETE_COMMENTS_OF_POST: 'DELETE FROM Comments WHERE postId = ?',
  };
  
  export default QUERY;