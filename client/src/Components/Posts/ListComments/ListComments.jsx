// ListComments.js
import CommentDisplay from "../CommentDisplay/CommentDisplay";

import React from "react";

const ListComments = ({ userId, comments, onDelete }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentDisplay
          key={comment.id}
          comment={comment}
          onDelete={userId === comment.userId ? onDelete : undefined}
        />
      ))}
    </div>
  );
};

export default ListComments;
