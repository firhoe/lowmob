import React from 'react';
import { useStore } from '../../utils/store';
import './QueueTracks.css';

export default function QueueTracks() {
  const { tracks } = useStore();

  return (
    <div className="queue__container">
        <img src={tracks[0]?.album?.images[0]?.url} className='queue__image' alt="playlist-cover" />
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <div>{track.name}</div>
            <div>{track.artists[0]?.name}</div>
            <div>{track.album?.name}</div>
            <div>{track.duration_ms}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
