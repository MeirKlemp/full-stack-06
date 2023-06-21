import { NavLink } from "react-router-dom";
import "./TopNav.css";

export function TopNav({ onLogout }) {
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) onLogout();
  };

  return (
    <>
      <nav className="topnav" id="myTopnav">
        <NavLink to="/Info">Info</NavLink>
        <NavLink to="/Posts">Posts</NavLink>
        <NavLink to="/Todos">Todos</NavLink>
        <NavLink to="/Albums">Albums</NavLink>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </>
  );
}

export default TopNav;
