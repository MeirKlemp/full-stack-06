import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import PhotoDisplay from "../../Components/Albums/PhotoDisplay";
import { UserInfoContext } from "../../App";
import apiFetch from "../../api";

function Album() {
  const { id } = useParams();
  const { apiKey } = useContext(UserInfoContext);
  const [album, setAlbum] = useState();
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPhotosFetched, setAllPhotosFetched] = useState(false);

  async function fetchAlbumData() {
    try {
      const response = await apiFetch(`albums/${id}`, "GET", apiKey);
      const newAlbumData = response.data;
      setAlbum(newAlbumData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function fetchPhotos() {
    const limit = "5";
    const page = currentPage.toString();
    const url = `photos?albumId=${id}&limit=${limit}&page=${page}`;

    try {
      const response = await apiFetch(url, "GET", apiKey);
      if (!response.data) {
        setAllPhotosFetched(true);
      }
      const data = response.data.photos;

      if (currentPage === 1) {
        setPhotos(data);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }

  useEffect(() => {
    fetchAlbumData();
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <main>
      {!album ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>Album Number {album.id}</h1>
          <h1>Title: {album.title}</h1>
          {photos.map((photo) => (
            <PhotoDisplay key={photo.id} photo={photo} />
          ))}
          {!allPhotosFetched && (
            <button onClick={handleNextPage}>Add More Photos</button>
          )}

          {allPhotosFetched && <p>All photos have been fetched.</p>}
        </>
      )}
    </main>
  );
}

export default Album;
