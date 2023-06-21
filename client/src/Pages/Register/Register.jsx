import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validations
    if (!username || !password || !name || !email) {
      alert("All fields except address are required.");
      return;
    }

    if (/^\d/.test(username)) {
      alert("Username should not start with a number.");
      return;
    }

    if (password.length < 4) {
      alert("Password should be at least 4 characters long.");
      return;
    }

    // Create a user object with the gathered attributes
    const user = {
      username: username,
      password: password,
      name: name,
      email: email,
      address: address,
    };

    // Make the POST request to localhost:2999/users
    fetch("http://localhost:2999/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Username or email already exists");
        }
      })
      .then((data) => {
        // Handle the response data
        console.log("User created:", data);

        alert("User was created successfully");

        // Navigate to the login page
        navigate("/login");
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error creating user:", error);
        // Display an error message to the user
        alert(error.message);
      });
  };

  return (
    <main>
      <h1>Register</h1>
      <NavLink to="/Login">Click here to login</NavLink>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label className="Register-Label" htmlFor="username">
            Username
          </label>
          <input
            className="Register-Input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label className="Register-Label" htmlFor="password">
            Password
          </label>
          <input
            className="Register-Input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label className="Register-Label" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="Register-Input"
            type="text"
            id="fullName"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label className="Register-Label" htmlFor="email">
            Email
          </label>
          <input
            className="Register-Input"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label className="Register-Label" htmlFor="address">
            Address
          </label>
          <input
            className="Register-Input"
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
