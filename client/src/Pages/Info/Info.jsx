import { useState, useEffect } from "react";
import ObjectAsList from "../../Components/ObjectDisplay/ObjectDisplay";

export function Info() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("UserId"));

  async function authorizedFetch(route, method, body) {
    const apiKey = localStorage.getItem("ApiKey");
    const url = `http://localhost:2999/${route}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: body? JSON.stringify(body): undefined,
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function fetchData() {
    try {
      const response = await authorizedFetch(`users/${userId}`, "GET");
      const newUserData = response.data;
      setUserData(newUserData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
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
