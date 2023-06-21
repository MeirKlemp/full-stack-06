import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api";

export default function NewPostForm() {
  const { userId, apiKey } = useContext(UserInfoContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return parseInt(`${timestamp}${randomNum}`);
  }

  function addPost(userId, title, body) {
    apiFetch("posts", "POST", apiKey, {
      title,
      body,
    })
      .then((response) => navigate("/Posts"))
      .catch((err) => alert("Couldn't create a new Post... Please try again."));
  }

  const handlePost = () => {
    addPost(userId, title, body);
    alert("Your post have been published successfully!");
  };

  return (
    <main>
      <h1>Add Post</h1>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea id="body" value={body} onChange={handleBodyChange} />
      </div>
      <button onClick={handlePost}>POST</button>
    </main>
  );
}
