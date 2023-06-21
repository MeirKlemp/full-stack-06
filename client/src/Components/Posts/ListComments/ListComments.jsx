// ListComments.js
import CommentDisplay from "../CommentDisplay/CommentDisplay";

import React from "react";

const ListComments = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ListComments;
