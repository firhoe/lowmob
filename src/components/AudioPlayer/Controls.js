import React from 'react';
import {useStore} from '../../utils/store';
import playIcon from '../../images/player-play-button.svg';
import pauseIcon from '../../images/player-stop-button.svg';
import nextIcon from '../../images/player-next-button.svg';
import previousIcon from '../../images/player-previous-button.svg';
import './Controls.css';

export default function Controls({handleNextSong, handlePreviousSong}) {
  const {isPlaying, setIsPlaying} = useStore();

  return (
    <div className="controls__container">
      <button onClick={handlePreviousSong} className="controls__button">
        <img src={previousIcon} alt="Previous Song" />
      </button>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="controls__button">
        {isPlaying ? (
          <img src={playIcon} alt="Play" />
        ) : (
          <img src={pauseIcon} alt="Pause" />
        )}
      </button>
      <button onClick={handleNextSong} className="controls__button">
        <img src={nextIcon} alt="Next Song" />
      </button>
    </div>
  );
}
