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
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        
        // The SWAPI API returns results in a 'results' property
        const filmsArray = data.results || data;
        
        if (!filmsArray || !Array.isArray(filmsArray)) {
          throw new Error('Invalid API response format');
        }
        
        // Sort movies by episode number
        const sortedMovies = filmsArray.sort((a, b) => a.episode_id - b.episode_id);
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
