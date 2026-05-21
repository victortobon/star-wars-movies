import React from 'react';
import './MovieCard.css';

function EpisodeBadge({ episodeId }) {
  return <div className="episode-badge">EPISODE {episodeId}</div>;
}

export default EpisodeBadge;
