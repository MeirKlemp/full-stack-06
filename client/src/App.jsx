import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNav from "./Components/TopNav/TopNav";
import Info from "./Pages/Info/Info";
import Todos from "./Pages/Todos/Todos";
import Posts from "./Pages/Posts/Posts";
import Post from "./Pages/Posts/Post";
import NewPost from "./Pages/Posts/NewPost";
import Albums from "./Pages/Albums/Albums";
import Album from "./Pages/Albums/Album";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";

function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem("UserId"));
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("ApiKey"));
  const navigate = useNavigate();

  function handleLogin(newUserId, newApiKey) {
    setUserId(newUserId);
    localStorage.setItem("UserId", newUserId);
    setApiKey(newApiKey);
    localStorage.setItem("ApiKey", newApiKey);
    navigate("/");
  }

  function handleLogout() {
    setUserId(null);
    setApiKey(null);
    localStorage.clear();
    navigate("/Login");
  }

  return (
    <>
      {userId && <TopNav onLogout={handleLogout} />}
      {userId ? (
        <Routes>
          <Route path="/" element={<Navigate to="/Info" />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Todos" element={<Todos />} />
          <Route path="/Posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<Post />} />
            <Route path="NewPost" element={<NewPost></NewPost>}></Route>
          </Route>
          <Route path="/Albums">
            <Route index element={<Albums />} />
            <Route path=":id" element={<Album />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
