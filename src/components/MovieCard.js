import React from 'react';
import './MovieCard.css';

function MovieCard({ movie, isExpanded, onToggleExpand }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`movie-card ${isExpanded ? 'expanded' : ''}`}>
      {/* Episode Badge */}
      <div className="episode-badge">EPISODE {movie.episode_id}</div>

      {/* Card Header */}
      <div className="card-header">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="release-year">({new Date(movie.release_date).getFullYear()})</p>
      </div>

      {/* Quick Info */}
      <div className="quick-info">
        <div className="info-item">
          <span className="label">Director:</span>
          <span className="value">{movie.director}</span>
        </div>
      </div>

      {/* Opening Crawl Preview */}
      <div className="crawl-preview">
        <p className="crawl-text">{movie.opening_crawl.substring(0, 150)}...</p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="expanded-content">
          <div className="full-crawl">
            <h3>OPENING CRAWL</h3>
            <p>{movie.opening_crawl}</p>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Producer:</span>
              <span className="detail-value">{movie.producer}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Director:</span>
              <span className="detail-value">{movie.director}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Release Date:</span>
              <span className="detail-value">{formatDate(movie.release_date)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Light Saber Accent */}
      <div className="lightsaber-accent"></div>

      {/* Toggle Button */}
      <button
        className="expand-button"
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
      >
        {isExpanded ? '▲ COLLAPSE' : '▼ READ MORE'}
      </button>
    </div>
  );
}

export default MovieCard;
