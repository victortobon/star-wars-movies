import React from 'react';

function DirectorInfo({ director }) {
  return (
    <div className="quick-info">
      <div className="info-item">
        <span className="label">Director:</span>
        <span className="value">{director}</span>
      </div>
    </div>
  );
}

export default DirectorInfo;
