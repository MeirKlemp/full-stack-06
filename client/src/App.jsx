import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
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

export const UserInfoContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem("UserInfo"))
  );
  const navigate = useNavigate();

  function handleLogin(newUserId, newApiKey) {
    const newUserInfo = {
      userId: newUserId,
      apiKey: newApiKey,
    };

    // Store the userInfoString in local storage
    localStorage.setItem("UserInfo", JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    navigate("/");
  }

  function handleLogout() {
    setUserInfo(null);
    localStorage.clear();
    navigate("/Login");
  }

  return (
    <>
      {userInfo && <TopNav onLogout={handleLogout} />}
      {userInfo ? (
        <UserInfoContext.Provider value={userInfo}>
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
        </UserInfoContext.Provider>
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
