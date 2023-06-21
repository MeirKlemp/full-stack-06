import { useEffect, useState } from "react";
import AlbumList from "../../Components/Albums/AlbumList";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("User")).id;
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userID}`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <main>
      <h1>Albums</h1>
      <AlbumList albums={albums} />
    </main>
  );
}

export default Albums;
