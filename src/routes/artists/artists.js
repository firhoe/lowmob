import React, { useEffect } from 'react'
import { useStore } from '../../utils/store'
import spotifyApi from '../../utils/auth';
import './artists.css'

export default function Artists() {
  const {spotifyToken, artists,setArtists} = useStore();

  useEffect(() => {
    spotifyApi.setAccessToken(spotifyToken);

    spotifyApi.getMyTopArtists({limit: 20}).then((response) => {
      const artist = response.items;
      setArtists(artist);
    });
  }, [spotifyToken, setArtists]);

  return (
    <div className="container flex">
      <div className="playlist__container playlist__container-artist">
        {artists.map((artist) => {
          return (
            <div className="playlist__card" key={artist.id}>
              <img
                src={artist?.images[0]?.url}
                className="playlist__image playlist__image-artist"
                alt="artist-art"
              />
              <p className="playlist__title">{artist.name}</p>
              <p className="playlist__subtitle">
                Popularity: {artist.popularity}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

