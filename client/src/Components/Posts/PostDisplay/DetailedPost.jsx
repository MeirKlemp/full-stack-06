import "./DetailedPost.css";
export default function DetailedPost({ id, title, body }) {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Post Number {id}</h1>
        <h2 className="card-text">Title: {title}</h2>
        <h3 className="card-text" style={{ textAlign: "left" }}>{body}</h3>
      </div>
    </div>
  );
}
