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
    //trackProgress,
    setTrackProgress,
  } = useStore();

  const audioRef = useRef(new Audio(tracks[0]?.preview_url));
  const audioSrc = tracks[currentIndex]?.preview_url;
  const isReady = useRef(false);
  const intervalRef = useRef();


  //const {duration} = audioRef.current;
  //const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handleNextSong = useCallback(() => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  }, [currentIndex, setCurrentIndex, tracks]);

  const handlePreviousSong = useCallback(() => {
    if (currentIndex - 1 < 0) setCurrentIndex(tracks.length - 1);
    else setCurrentIndex(currentIndex - 1);
  }, [currentIndex, setCurrentIndex, tracks]);

  const trackProgressUpdater = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNextSong();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }, [audioRef, handleNextSong, setTrackProgress]);

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
  }, [isPlaying, audioSrc, trackProgressUpdater]);

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
  }, [
    currentIndex,
    currentTrack,
    audioSrc,
    trackProgressUpdater,
    setIsPlaying,
    setTrackProgress,
  ]);

  useEffect(() => {
    const track = tracks[currentIndex];
    setCurrentTrack(track);
  }, [currentIndex, setCurrentTrack, tracks]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
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
      <ProgressBar isPlaying={true} /*percentage={currentPercentage}*/ />
    </div>
  );
}
