import React from 'react';
import './CommentDisplay.css';


const CommentDisplay = ({ comment }) => {
    return (
        <div className="comment">
            <h2>Username: {comment.name}</h2>
            <h3>Email: {comment.email}</h3>
            <p>{comment.body}</p>
        </div>
    );
};

export default CommentDisplay;
