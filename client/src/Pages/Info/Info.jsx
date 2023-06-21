import { useState, useEffect } from "react";
import ObjectAsList from "../../Components/ObjectDisplay/ObjectDisplay";

export function Info() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = JSON.parse(localStorage.getItem("User")).id;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?id=${userID}`)
      .then((response) => response.json())
      .then((data) => setUserData(data[0]));
      setLoading(false);
  }, []);

  return (
    <main>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div>
          <h2>Welcome back, {userData.name}</h2>
          <div style={{ textAlign: "left" }}>
            <ObjectAsList object={userData}></ObjectAsList>
          </div>
        </div>
      )}
    </main>
  );
}

export default Info;
