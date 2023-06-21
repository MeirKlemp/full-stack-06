import { useState, useEffect, useContext } from "react";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api"
import UserDisplay from "../../Components/Users/UserDisplay/UserDisplay";

export function Info() {
  console.log(useContext(UserInfoContext));
  const { userId, apiKey } = useContext(UserInfoContext);
  console.log(userId);
  console.log(apiKey);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);


  async function fetchData() {
    try {
      const response = await apiFetch(`users/${userId}`, "GET", apiKey);
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
            <UserDisplay user={userData}></UserDisplay>
          </div>
        </div>
      )}
    </main>
  );
}

export default Info;
