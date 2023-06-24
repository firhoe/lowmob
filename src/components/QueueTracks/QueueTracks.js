import React from 'react';
import {useStore} from '../../utils/store';
import './QueueTracks.css';

export default function QueueTracks() {
  const {tracks, currentTrack} = useStore();

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <div className="queue__container">
      <div className="queue__header">
        <img
          src={tracks[0]?.album?.images[0]?.url}
          className="queue__image"
          alt="playlist-cover"
        />
        <div className="queue__info">
          <h2 className="queue__current-song">{currentTrack?.name}</h2>
          <p className="queue__current-artist">
            Artist: {currentTrack?.artists[0]?.name}
          </p>
          <p className="queue__current-release">
            Release date: {currentTrack?.album?.release_date}
          </p>
        </div>
      </div>
      <div className="queue__playlist">
        <div className="queue__list">
          <p className="queue__item-song"># Título</p>
          <p className="queue__item-artist">Artista</p>
          <p className="queue__item-album">Álbum</p>
          <p className="queue__item-duration queue__icon"></p>
        </div>
        {tracks.map((track) => (
          <div className="queue__list" key={track.id}>
            <p className="queue__item-song">{track.name}</p>
            <p className="queue__item-artist">{track.artists[0]?.name}</p>
            <p className="queue__item-album">{track.album?.name}</p>
            <p className="queue__item-duration">
              {msToMinutesAndSeconds(track.duration_ms)}
            </p>
          </div>
        ))}
      </div>
      <div className="queue__blur"></div>
    </div>
  );
}
