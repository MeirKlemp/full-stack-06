import React from "react";

function UserDisplay({ user }) {
  return (
    <div className="user-display">
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
    </div>
  );
}

export default UserDisplay;
