import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({percentage}) {
  return (
    <div className="progress__container">
      <div className="progress__fill" style={{width: `${percentage}%`}}></div>
    </div>
  );
}
