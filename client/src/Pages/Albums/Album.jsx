import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PhotoDisplay from "../../Components/Albums/PhotoDisplay";

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPhotosFetched, setAllPhotosFetched] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("User")).id;
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.userId === userID) {
          setAlbum(data);
        } else {
          navigation("/NotFound");
        }
      });
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);

  const fetchPhotos = async () => {
    const limit = "5";
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${id}&_limit=${limit}&_page=${currentPage}`
    );
    const data = await response.json();
    if (currentPage === 1) setPhotos(data);
    else setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    if (data.length === 0) setAllPhotosFetched(true);
  };

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
