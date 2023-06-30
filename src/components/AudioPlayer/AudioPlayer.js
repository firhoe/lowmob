import React, {useEffect, useRef, useCallback} from 'react';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import {useStore} from '../../utils/store';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const {
    tracks,
    currentTrack,
    setCurrentTrack,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    //setIsPlaying,
    trackProgress,
    setTrackProgress,
  } = useStore();

  const audioRef = useRef(null); 
  const audioSrc = tracks[currentIndex]?.preview_url;
  const isLoaded = useRef(false);
  const intervalRef = useRef(null); 

  const handleNextSong = useCallback(() => {
    if (isLoaded.current && currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      isLoaded.current = false;
    } else if (isLoaded.current && currentIndex === tracks.length - 1) {
      setCurrentIndex(0);
      isLoaded.current = false;
    }
  }, [currentIndex, setCurrentIndex, tracks]);

  const handlePreviousSong = useCallback(() => {
    if (currentIndex - 1 < 0) setCurrentIndex(tracks.length - 1);
    else setCurrentIndex(currentIndex - 1);
  }, [currentIndex, setCurrentIndex, tracks]);

  const trackProgressUpdater = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      try {
        if (audioRef.current && audioRef.current.ended) {
          handleNextSong();
        } else {
          setTrackProgress(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          );
        }
      } catch (e) {
        console.error('Error updating track progress:', e);
      }
    }, 1000);
  }, [audioRef, handleNextSong, setTrackProgress]);

  useEffect(() => {
    if (!audioRef.current) {
      
      audioRef.current = new Audio();
    }

    try {
      audioRef.current.pause();
      audioRef.current.src = audioSrc; 

      setTrackProgress(audioRef.current.currentTime);

      audioRef.current.oncanplaythrough = () => {
        isLoaded.current = true;
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error('Error playing audio:', error);
          });
          trackProgressUpdater();
        }
      };

      audioRef.current.onerror = (error) => {
        console.error('Error loading audio:', error);
      };
    } catch (e) {
      console.error('Error setting up audio:', e);
    }
  }, [
    currentIndex,
    audioSrc,
    setTrackProgress,
    isPlaying,
    trackProgressUpdater,
  ]);

  useEffect(() => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          if (audioRef.current.paused) {
            audioRef.current.play();
            trackProgressUpdater();
          }
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      } catch (e) {
        console.error('Error playing/pausing audio:', e);
      }
    }
  }, [isPlaying, trackProgressUpdater]);

  useEffect(() => {
    const track = tracks[currentIndex];
    setCurrentTrack(track);
  }, [currentIndex, setCurrentTrack, tracks]);

  useEffect(() => {
    return () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
          clearInterval(intervalRef.current);
        }
      } catch (e) {
        console.error('Error cleaning up audio:', e);
      }
    };
  }, []);

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
        handleNextSong={handleNextSong}
        handlePreviousSong={handlePreviousSong}
      />
      <ProgressBar percentage={trackProgress} />
    </div>
  );
}
