import React from 'react';

function PhotoDisplay({ photo }) {
  const photoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '10px',
  };

  return (
    <div style={photoStyle}>
      <img src={photo.url} alt={photo.title} style={imageStyle} />
      <h2>{photo.title}</h2>
    </div>
  );
}

export default PhotoDisplay;