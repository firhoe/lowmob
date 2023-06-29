import React, {useEffect, useRef} from 'react';
import ProgressBar from './ProgressBar.js';
import Controls from './Controls.js';
import {useStore} from '../../utils/store';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const {
    tracks,
    currentTrack,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying,
    trackProgress,
    setTrackProgress,
  } = useStore();

  const audioRef = useRef(new Audio(tracks[0]?.track.preview_url || ''));
  const audioSrc = tracks[currentIndex]?.track?.preview_url || '';
  const isReady = useRef(false);
  const intervalRef = useRef();

  const {duration} = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const trackProgressUpdater = () => {
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNextSong();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        trackProgressUpdater();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        trackProgressUpdater();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      trackProgressUpdater();
    } else {
      isReady.current = true;
    }
  }, [currentIndex, currentTrack, audioSrc]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleNextSong = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(currentIndex - 1);
  };

  const handlePreviousSong = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(tracks.length -1);
    else setCurrentIndex(currentIndex - 1);
  };

  console.log('tracks[currentIndex]:', tracks[currentIndex]); 

  return (
    <div className="audioPlayer__container">
      <div className="audioPlayer__songInfo">
        <img
          src={currentTrack?.album?.images[0]?.url}
          alt="Album Cover"
          className="audioPlayer__album"
        />
        <div className="audioPlayer__songDetails">
          <p className="audioPlayer__song">{currentTrack?.name}</p>
          <p className="audioPlayer__artist">
            {currentTrack?.artists[0]?.name}
          </p>
        </div>
      </div>
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleNextSong={handleNextSong}
        handlePreviousSong={handlePreviousSong}
        tracks={tracks}
      />
      <ProgressBar isPlaying={true} percentage={currentPercentage} />
    </div>
  );
}
