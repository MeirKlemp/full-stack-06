import { useState } from "react";
import "./LoginStyle.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${username}`
      );
      const users = await response.json();
      if (users.length === 0) {
        alert("User was not found");
        return;
      }
      const user = users[0];
      const lat = user.address.geo.lat;
      const actualPassword = lat.substring(lat.length - 4);

      if (password === actualPassword) {
        alert("Login successful");
        onLogin(user);
      } else {
        alert("Password is incorrect");
      }
    } catch (error) {
      alert("Error getting info from server");
      console.error(error);
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label className="Login-Label" htmlFor="username">Username</label>
          <input className="Login-Input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label className="Login-Label" htmlFor="password">Password</label>
          <input className="Login-Input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </main>
  );
}

export default Login;
