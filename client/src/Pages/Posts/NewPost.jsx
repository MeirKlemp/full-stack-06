import { useEffect, useState } from "react";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [posts, setPosts] = useState(() => {
    const localValue = localStorage.getItem("Posts");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    console.log("Posts has changed");
    localStorage.setItem("Posts", JSON.stringify(posts));
  }, [posts]);

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
    setPosts((currentPosts) => {
      return [
        {
          userId: userId,
          id: generateUniqueId(),
          title: title,
          body: body,
        },
        ...currentPosts,
      ];
    });
  }

  const handlePost = () => {
    const userID = JSON.parse(localStorage.getItem("User")).id;
    addPost(userID, title, body);
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
