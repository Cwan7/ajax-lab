import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [starships, setStarships] = useState([]);
  const [search, setSearch] = useState('');
  const [userSearch, setUserSearch] = useState(null);
  const [searchedStarships, setSearchedStarships] = useState([])
  const [page, setPage] = useState(1);
   
  

  useEffect (() => {
    const getStarShips = async () => {
      const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
      const data = await response.json();
      setStarships(data.results);
    };
    getStarShips()
  }, [page])
  const handleSubmit = async (event)=> {
    event.preventDefault();
    let response = await fetch(`https://swapi.dev/api/starships/?search=${search}`);
    let JSONdata = await response.json();
    const newStarship = JSONdata.results[0];
    setUserSearch(newStarship)
    setSearchedStarships([...searchedStarships, newStarship]);
    setSearch('')
  }
  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  const handleNext = () => {
    if (page === 4) {
      setPage(1);
    } else {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (page === 1) {
      setPage(4)
    } else {
      setPage(page - 1)
    }
  }
  return (
  <div className="app">
    <h1>Star Wars Starships</h1>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={search}
          placeholder="Search for a starship..."
        />
        <button type="submit">Search</button>
      </form>
      {searchedStarships.length > 0 ? (
        <div>
          <div className="starship-list">
            {searchedStarships.map((starship, index) => (
              <div key={index} className="starship-card">
                <h2>{starship.name}</h2>
                <p><span>Class: </span>{starship.starship_class}</p>
                <p><span>Manufacturer: </span>{starship.manufacturer}</p>
                <p><span>Model: </span>{starship.model}</p>
              </div>
            ))}
          </div>
        </div>
      ) : starships.length > 0 ? (
        <div>
          <div className="navigation">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
          <div><p>Showing: {starships.length}</p></div>
          <div className="starship-list">
            {starships.map((starship, index) => (
              <div key={index} className="starship-card">
                <h2>{starship.name}</h2>
                <p><span>Class: </span>{starship.starship_class}</p>
                <p><span>Manufacturer: </span>{starship.manufacturer}</p>
                <p><span>Model: </span>{starship.model}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading Starships...</p>
      )}
 
  </div>
  
  );
}

export default App

// CR90 corvette   
   