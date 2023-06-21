import { NavLink } from "react-router-dom";

export function SimplePostDisplay({ id, title, body }) {
  return (
    <NavLink to={`/Posts/${id}`}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Post Number {id} : {title}
          </h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    </NavLink>
  );
}
