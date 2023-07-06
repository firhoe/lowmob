import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useStore} from '../../utils/store';
import { motion } from 'framer-motion'
import spotifyApi from '../../utils/auth';
import './playlist.css';

export default function Playlist() {
  const {spotifyToken, playlists, setPlaylists} = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);

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
        {playlists.map((playlist, i) => {
          return (
            <motion.div
              className="playlist__card"
              key={playlist.id}
              onClick={() => handlePlayPlaylist(playlist.id)}
              initial={{opacity: 0, translateX: -50, translateY: -50}}
              animate={{opacity: 1, translateX: 0, translateY: 0}}
              transition={{duration: 0.3, delay: i * 0.1}}
              >
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
