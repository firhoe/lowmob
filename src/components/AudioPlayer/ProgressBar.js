import React from 'react'
import { useStore } from '../../utils/store'
import './ProgressBar.css'

export default function ProgressBar() {
  const {currentTrack, trackProgress} = useStore();

  const calculateProgress = () => {
    if (currentTrack && currentTrack.duration) {
      return (trackProgress / currentTrack.duration) * 100;
    }
    return 0;
  };

  return (
    <div className="progress__container">
      <div
        className="progress__fill"
        style={{width: `${calculateProgress()}%`}}></div>
    </div>
  );
}
