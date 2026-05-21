import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setDebugInfo('Fetching from swapi.info...');
        
        // Try the swapi.info endpoint first
        let response = await fetch('https://swapi.info/api/films');
        
        // If that fails, try swapi.dev
        if (!response.ok) {
          setDebugInfo('swapi.info failed, trying swapi.dev...');
          response = await fetch('https://swapi.dev/api/films/');
        }
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        setDebugInfo(`API Response received. Data type: ${typeof data}`);
        console.log('Full API Response:', data);
        
        // Handle different response formats
        let filmsArray;
        if (Array.isArray(data)) {
          filmsArray = data;
          setDebugInfo('Response is an array');
        } else if (data.results && Array.isArray(data.results)) {
          filmsArray = data.results;
          setDebugInfo('Response has results property');
        } else if (data.films && Array.isArray(data.films)) {
          filmsArray = data.films;
          setDebugInfo('Response has films property');
        } else {
          setDebugInfo(`Could not find array. Data keys: ${Object.keys(data).join(', ')}`);
          throw new Error('No films data found in API response');
        }
        
        setDebugInfo(`Found ${filmsArray.length} films`);
        console.log('Films Array:', filmsArray);
        
        if (filmsArray.length === 0) {
          throw new Error('No films data found in API response');
        }
        
        // Sort movies by episode number
        const sortedMovies = filmsArray.sort((a, b) => a.episode_id - b.episode_id);
        setMovies(sortedMovies);
        setError(null);
        setDebugInfo(`Successfully loaded ${sortedMovies.length} films`);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setMovies([]);
        setDebugInfo(`Error: ${err.message}`);
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
            {debugInfo && <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#ffaa00' }}>{debugInfo}</p>}
          </div>
        )}

        {error && (
          <div className="error">
            <p>⚠️ Error loading movies: {error}</p>
            <p>Please check your connection and try again.</p>
            {debugInfo && <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>{debugInfo}</p>}
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="no-results">
            <p>No Star Wars films found.</p>
            {debugInfo && <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>{debugInfo}</p>}
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
