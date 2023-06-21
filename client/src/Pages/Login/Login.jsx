import { useState } from "react";
import "./LoginStyle.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password };
    try {
      const response = await fetch("http://localhost:2999/apikeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Handle the successful response here
        console.log("POST request successful");
        const responseData = await response.json(); // Parse the response body as JSON
        const apiKey = responseData.data.apiKey; // Retrieve the API key

        // Construct the URL with the username parameter
        const url = `http://localhost:2999/users/${username}`;

        try {
          const userResponse = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `apikey ${apiKey}`,
            },
          });

          if (userResponse.ok) {
            const userJson = await userResponse.json();
            setUser(userJson.data);
            console.log("User data:", userJson.data);

            // Navigate to the desired location
            navigate("/");
          } else {
            console.error("Error fetching user:", userResponse.statusText);
            // Handle the error
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          // Handle the error
        }

        alert("Login successful");
        onLogin(username, apiKey);
      } else {
        console.error("POST request failed");
        alert("Password is incorrect");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Error getting info from server");
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label className="Login-Label" htmlFor="username">
            Username
          </label>
          <input
            className="Login-Input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label className="Login-Label" htmlFor="password">
            Password
          </label>
          <input
            className="Login-Input"
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
