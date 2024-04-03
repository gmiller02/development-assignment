import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import './play.css';

function Play({ playData, onFavorite, onRemoveFromFavorites }) {
    const { WorkID, Title, Date, GenreType } = playData;
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
        if (!isFavorite) {
            onFavorite(playData); // Add play to favorites
        } else {
            onRemoveFromFavorites(WorkID); // Remove play from favorites
        }
    };

    const mapGenreType = (genreTag) => {
      switch (genreTag) {
          case '~c~':
              return 'Comedy';
          case '~t~':
              return 'Tragedy';
          case '~h~':
              return 'History';
          case '~p~':
              return 'Poem';
          default:
              return 'Unknown';
      }
  };
  
    return (
      <div className="play">
        <h2>{Title}</h2>
        <p>Date Published: {Date}</p>
        <p>Genre: {mapGenreType(GenreType)}</p>
        <img src="./willy_shakes_2.jpeg" alt="Play Icon" className="play-image"/>
        <button onClick={toggleFavorite}>
        <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
      </button>
      </div>
    );
  }
  
  export default Play;