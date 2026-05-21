import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList({ movies }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggleExpand = (movieId) => {
    setExpandedId(expandedId === movieId ? null : movieId);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.episode_id}
          movie={movie}
          isExpanded={expandedId === movie.episode_id}
          onToggleExpand={() => handleToggleExpand(movie.episode_id)}
        />
      ))}
    </div>
  );
}

export default MovieList;
