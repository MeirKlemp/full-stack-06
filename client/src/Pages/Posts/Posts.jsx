import { useEffect, useState } from "react";
import { PostList } from "../../Components/Posts/PostsDisplay/PostList.jsx";
import { NavLink } from "react-router-dom";

export function Posts() {
  const [posts, setPosts] = useState(() => {
    const localValue = localStorage.getItem("Posts");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("User")).id;
    if (posts.length === 0) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }
  }, []);

  useEffect(() => {
    console.log("Posts has changed");
    localStorage.setItem("Posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <main>
      <NavLink to={`/Posts/NewPost`}>
        <button>Create a new post here</button>
      </NavLink>
      <div className="postsBody">
        <h1 className="header">Your Posts</h1>
        <PostList posts={posts} />
      </div>
    </main>
  );
}
export default Posts;
