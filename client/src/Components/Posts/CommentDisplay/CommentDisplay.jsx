import React from "react";
import "./CommentDisplay.css";

const CommentDisplay = ({ comment, onDelete }) => {
  return (
    <div className="comment">
      <h2>Username: {comment.username}</h2>
      <h3>Email: {comment.email}</h3>
      <p>{comment.body}</p>
      {onDelete && (
        <button onClick={(e) => onDelete(comment.id)}>Delete</button>
      )}
    </div>
  );
};

export default CommentDisplay;
