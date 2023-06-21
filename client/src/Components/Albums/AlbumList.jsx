import { NavLink } from "react-router-dom";

export function AlbumList({ albums }) {
  return (
    <div>
      {albums.map((album) => (
        <div key={album.id} style={{ textAlign: "left" }}>
          <NavLink to={`/Albums/${album.id}`}>
            Album Number {album.id}: {album.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default AlbumList;
