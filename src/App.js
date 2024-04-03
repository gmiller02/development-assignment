import logo from './logo.svg';
import './App.css';
import Play from './play.js';
import playsData from './playData.json';
import { useState, useEffect } from "react";

const genreMapping = {
  '~c~': 'Comedy',
  '~t~': 'Tragedy',
  '~h~': 'History',
};

const typeMapping = {
  'plays': 'Plays',
  'poems': 'Poems'
};

function App() {
  const [favorites, setFavorites] = useState([]);
  const [sortedPlays, setSortedPlays] = useState([]); 
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const addToFavorites = (play) => {
    setFavorites([...favorites, play]);
  };

  const removeFromFavorites = (workID) => {
    setFavorites(favorites.filter(play => play.WorkID !== workID));
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
  };

  const updateFilteredPlays = () => {
    let filteredPlays = playsData.filter(play => {
      if (selectedType === 'plays') {
        return !play.GenreType.includes('~p~') && !play.GenreType.includes('~s~');
      } else if (selectedType === 'poems') {
        return play.GenreType.includes('~p~') || play.GenreType.includes('~s~');
      } else {
        return true;
      }
    });

    if (selectedGenre !== '') {
      filteredPlays = filteredPlays.filter(play => play.GenreType === selectedGenre);
    }

    setSortedPlays(filteredPlays);
  };

  const sortPlaysByDate = () => {
    const sortedPlaysCopy = [...sortedPlays];
    sortedPlaysCopy.sort((a, b) => {
      return new Date(a.Date) - new Date(b.Date);
    });
    setSortedPlays(sortedPlaysCopy);
  };

  const resetFilters = () => {
    setSelectedType('');
    setSelectedGenre('');
    updateFilteredPlays(); // Update filtered plays
  };

  useEffect(() => {
    updateFilteredPlays();
  }, [selectedType, selectedGenre]); // Update filtered plays whenever type or genre changes

  useEffect(() => {
    setSortedPlays(playsData); // Reset sorted plays whenever playsData changes
  }, [playsData]);

  return (
    <div className="App">
      <div className="content">
        <div className="left-column">
          <div className= "header-content">
            <h1>Shakespeare Library</h1>
            <div className="button-container">
              <button onClick={sortPlaysByDate}>Sort by Year</button> 
              <label htmlFor="typeFilter">Sort by Type: </label>
              <select id="typeFilter" value={selectedType} onChange={handleTypeChange}>
                <option value="">All</option>
                <option value="plays">Plays</option>
                <option value="poems">Poems</option>
              </select>
              <label htmlFor="genreFilter">Sort by Genre: </label>
              <select id="genreFilter" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All</option>
                {Object.entries(genreMapping).map(([abbreviated, full]) => (
                  <option key={abbreviated} value={abbreviated}>{full}</option>
                ))}
              </select>
              <button onClick={resetFilters}>Reset</button>
            </div>
          </div>
          <div className="play-list">
            <div className="grid-container">
              {sortedPlays.map((playData) => (
                <Play key={playData.WorkID} playData={playData} onFavorite={addToFavorites} onRemoveFromFavorites={removeFromFavorites}/>
              ))}
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="favorites">
            <h2>Favorites</h2>
            <ul>
              {favorites.map((favorite) => (
                <li key={favorite.WorkID}>{favorite.Title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

