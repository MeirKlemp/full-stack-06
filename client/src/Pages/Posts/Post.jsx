import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DetailedPost from "../../Components/Posts/PostDisplay/DetailedPost";
import ListComments from "../../Components/Posts/ListComments/ListComments";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("User")).id;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.userId === userID) {
          setPost(data);
        } else {
          navigation("/NotFound");
        }
      });
  }, []);

  const loadComments = () => {
    setIsLoadingComments(true);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setIsLoadingComments(false);
        setShowButton(false);
      });
  };

  return (
    <main>
      {!post ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <DetailedPost id={post.id} title={post.title} body={post.body} />
          {showButton && (
            <button onClick={loadComments} disabled={isLoadingComments}>
              {isLoadingComments ? "Loading comments..." : "Load comments"}
            </button>
          )}
          <ListComments comments={comments} />
        </div>
      )}
    </main>
  );
}

export default Post;
