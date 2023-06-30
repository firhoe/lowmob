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
    setIsPlaying,
    trackProgress,
    setTrackProgress,
  } = useStore();

  const audioRef = useRef(new Audio(tracks[0]?.preview_url));
  const audioSrc = tracks[currentIndex]?.preview_url;
  const isLoaded = useRef(false);
  const intervalRef = useRef();

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
    try {
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
          trackProgressUpdater();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      }
    } catch (e) {
      console.error('Error playing/pausing audio:', e);
    }
  }, [isPlaying, audioSrc, trackProgressUpdater]);

  useEffect(() => {
    try {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);

      setTrackProgress(audioRef.current.currentTime);

      audioRef.current.oncanplaythrough = () => {
        isLoaded.current = true;
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error('Error playing audio:', error);
          });
          setIsPlaying(true);
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
    currentTrack,
    audioSrc,
    trackProgressUpdater,
    isPlaying,
    setIsPlaying,
    setTrackProgress,
  ]);

  useEffect(() => {
    try {
      const track = tracks[currentIndex];
      setCurrentTrack(track);
    } catch (e) {
      console.error('Error setting current track:', e);
    }
  }, [currentIndex, setCurrentTrack, tracks]);

  useEffect(() => {
    return () => {
      try {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
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
