import React, {useEffect} from 'react';
import {useStore} from '../../utils/store';
import './playlist.css';
import spotifyApi from '../../utils/auth';

export default function Playlist() {
  const {spotifyToken, playlists, setPlaylists} = useStore();

  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);

    spotifyApi.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists.items);
      console.log(playlists.items);
    });
  }, [spotifyToken, setPlaylists]);

  return (
    <div className="container">
      <div className="playlist__container">
        {playlists.map((playlist) => {
          return (
            <div className="playlist__card" key={playlist.id}>
              <img
                src={playlist.images[0].url}
                className="playlist__image"
                alt="playlist-art"
              />
              <button className="playlist__button">
                <p className='playlist__button-text'>Play it</p>
                <div className="playlist__button-icon"></div>
              </button>
              <p className='playlist__title'>{playlist.name}</p>
              <p className='playlist__subtitle'>{playlist.tracks.total} Songs</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
