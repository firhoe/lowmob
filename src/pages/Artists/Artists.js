import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useStore} from '../../utils/store';
import {motion} from 'framer-motion';
import spotifyApi from '../../utils/authorization';
import './Artists.css';

export default function Artists() {
  const {spotifyToken, artists, setArtists} = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);

    spotifyApi
      .getMyTopArtists({limit: 20})
      .then((response) => {
        const artist = response.items;
        setArtists(artist);
      })
      .catch((error) => {
        console.error('Error getting top artist:', error);
        navigate('/*', {state: {error: error}});
      });
  }, [spotifyToken, setArtists, navigate]);

  return (
    <div className="container flex">
      <div className="playlist__container playlist__container-artist">
        {artists.map((artist, i) => {
          return (
            <motion.div
              className="playlist__card"
              key={artist.id}
              initial={{opacity: 0, translateX: -50, translateY: -50}}
              animate={{opacity: 1, translateX: 0, translateY: 0}}
              transition={{duration: 0.3, delay: i * 0.1}}>
              <img
                src={artist?.images[0]?.url}
                className="playlist__image playlist__image-artist"
                alt="artist-art"
              />
              <p className="playlist__title">{artist.name}</p>
              <p className="playlist__subtitle">
                Popularity: {artist.popularity}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
