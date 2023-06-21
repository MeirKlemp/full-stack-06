import { useContext, useEffect, useState } from "react";
import AlbumList from "../../Components/Albums/AlbumList";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api";

function Albums() {
  const { apiKey } = useContext(UserInfoContext);
  const [albums, setAlbums] = useState([]);

  async function fetchData() {
    try {
      const response = await apiFetch(`albums`, "GET", apiKey);
      const newAlbumData = response.data;
      setAlbums(newAlbumData.albums);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1>Albums</h1>
      <AlbumList albums={albums} />
    </main>
  );
}

export default Albums;
