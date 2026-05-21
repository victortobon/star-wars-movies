import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Try the swapi.info endpoint first
        let response = await fetch('https://swapi.info/api/films');
        
        if (!response.ok) {
          response = await fetch('https://swapi.dev/api/films/');
        }
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Full API Response:', JSON.stringify(data, null, 2));
        
        // Get the films - the API returns an array directly
        const filmsArray = data;
        
        console.log('Films Array:', filmsArray);
        console.log('Is Array:', Array.isArray(filmsArray));
        console.log('Length:', filmsArray ? filmsArray.length : 'N/A');
        
        if (!Array.isArray(filmsArray)) {
          throw new Error('API response is not an array');
        }
        
        if (filmsArray.length === 0) {
          throw new Error('No films returned from API');
        }
        
        // Sort movies by episode number
        const sortedMovies = [...filmsArray].sort((a, b) => a.episode_id - b.episode_id);
        setMovies(sortedMovies);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">STAR WARS FILMS</h1>
        <p className="app-subtitle">May the Force be with you...</p>
      </header>

      <main className="app-main">
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Searching the galaxy for Star Wars films...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>⚠️ Error loading movies: {error}</p>
            <p>Please check your connection and try again.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="no-results">
            <p>No Star Wars films found.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Star Wars Data from SWAPI</p>
      </footer>
    </div>
  );
}

export default App;
