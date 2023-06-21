import { SimplePostDisplay } from "../PostDisplay/SimplePostDisplay.jsx";
import "./PostList.css";

export function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <SimplePostDisplay {...post} />
        </div>
      ))}
    </div>
  );
}
