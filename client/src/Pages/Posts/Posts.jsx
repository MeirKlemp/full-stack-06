import { useEffect, useState, useContext } from "react";
import { PostList } from "../../Components/Posts/PostsDisplay/PostList.jsx";
import { NavLink } from "react-router-dom";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api";

export function Posts() {
  const { userId, apiKey } = useContext(UserInfoContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiFetch(`posts?userId=${userId}`, "GET", apiKey)
      .then((response) => setPosts(response.data.posts))
      .catch((err) => alert("Couldn't load posts... Please refresh the page"));
  }, []);

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
