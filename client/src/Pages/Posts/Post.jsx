import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import DetailedPost from "../../Components/Posts/PostDisplay/DetailedPost";
import ListComments from "../../Components/Posts/ListComments/ListComments";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api";

function Post() {
  const { userId, apiKey } = useContext(UserInfoContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`posts/${id}`, "GET", apiKey)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) =>
        alert("Couldn't load the post... Please refresh the page")
      );
  }, []);

  const canDelete = post && post.userId === userId;
  const handleDelete = () => {
    apiFetch(`posts/${id}`, "DELETE", apiKey).catch((err) =>
      alert("Couldn't delete the post... Please refresh the page")
    );
    navigate("/Posts");
  };

  const loadComments = () => {
    setIsLoadingComments(true);
    apiFetch(`comments?postId=${id}`, "GET", apiKey)
      .then((response) => {
        setComments(response.data.comments);
        setIsLoadingComments(false);
        setShowButton(false);
      })
      .catch((err) =>
        alert("Couldn't load the comments... Please refresh the page")
      );
  };

  const handleDeleteComment = (commentId) => {
    apiFetch(`comments/${commentId}`, "DELETE", apiKey).catch((err) =>
      alert("Couldn't delete the comment... Please refresh the page")
    );
    setComments((comments) => comments.filter((c) => c.id !== commentId));
  };

  return (
    <main>
      {!post ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <DetailedPost id={post.id} title={post.title} body={post.body} />
          {canDelete && <button onClick={handleDelete}>Delete</button>}
          {showButton && (
            <button onClick={loadComments} disabled={isLoadingComments}>
              {isLoadingComments ? "Loading comments..." : "Load comments"}
            </button>
          )}
          <ListComments
            userId={userId}
            comments={comments}
            onDelete={handleDeleteComment}
          />
        </div>
      )}
    </main>
  );
}

export default Post;
