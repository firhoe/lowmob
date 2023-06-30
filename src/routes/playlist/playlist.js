import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useStore} from '../../utils/store';
import './playlist.css';
import spotifyApi from '../../utils/auth';

export default function Playlist() {
  const {spotifyToken, playlists, setPlaylists} = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);
    //console.log(spotifyToken);

    spotifyApi.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists.items);
    });
  }, [spotifyToken, setPlaylists]);

  const handlePlayPlaylist = (id) => {
    navigate('/player', {state: {id: id}});
  };

  return (
    <div className="container flex">
      <div className="playlist__container">
        {playlists.map((playlist) => {
          return (
            <div
              className="playlist__card"
              key={playlist.id}
              onClick={() => handlePlayPlaylist(playlist.id)}>
              <img
                src={playlist?.images[0]?.url}
                className="playlist__image"
                alt="playlist-art"
              />
              <button className="playlist__button"></button>
              <p className="playlist__title">{playlist.name}</p>
              <p className="playlist__subtitle">
                {playlist.tracks.total} Songs
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
