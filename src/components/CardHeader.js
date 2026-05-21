import React from 'react';

function CardHeader({ title, year }) {
  return (
    <div className="card-header">
      <h2 className="movie-title">{title}</h2>
      <p className="release-year">({year})</p>
    </div>
  );
}

export default CardHeader;
