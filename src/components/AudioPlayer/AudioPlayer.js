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
        <p className="audioPlayer__song">{currentTrack?.name}</p>
        <p className="audioPlayer__artist">{currentTrack?.artists[0]?.name}</p>
      </div>
      <Controls />
      <ProgressBar />
    </div>
  );
}
