import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <main>
      <h1>This page doesn't exist! You'll be returned to the home page.</h1>
    </main>
  );
}

export default NotFound;
