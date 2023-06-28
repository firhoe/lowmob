import React from 'react';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import {useStore} from '../../utils/store';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const {currentTrack} = useStore();

  return (
    <div className="audioPlayer__container">
      <div className="audioPlayer__songInfo">
        <img
          src={currentTrack?.album?.images[0]?.url}
          alt="Album Cover"
          className="audioPlayer__album"
        />
        <div className='audioPlayer__songDetails'>
          <p className="audioPlayer__song">{currentTrack?.name}</p>
          <p className="audioPlayer__artist">
            {currentTrack?.artists[0]?.name}
          </p>
        </div>
      </div>
      <Controls />
      <ProgressBar />
    </div>
  );
}
