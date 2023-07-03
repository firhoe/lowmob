import React, {useEffect} from 'react';
import {useStore} from '../../utils/store';
import spotifyApi from '../../utils/auth';
import './Widgets.css';

export default function Widgets() {
  const {
    topTracks,
    setTopTracks,
    recommendedTracks,
    setRecommendedTracks,
    savedTracks,
    setSavedTracks,
  } = useStore();

  useEffect(() => {
    if (recommendedTracks.length === 0) {
      spotifyApi
        .getMyTopTracks({limit: 5, time_range: 'short_term'})
        .then((response) => {
          const topTracks = response.items;
          setTopTracks(topTracks);

          const topTrackIds = topTracks.map((track) => track.id);

          spotifyApi
            .getRecommendations({seed_tracks: topTrackIds, limit: 5})
            .then((response) => {
              const recommendedTracks = response.tracks;
              setRecommendedTracks(recommendedTracks);
            })
            .catch((error) => {
              console.error('Error getting recommended tracks:', error);
            });
        })
        .catch((error) => {
          console.error('Error getting top tracks:', error);
        });
    }

    spotifyApi
      .getMyRecentlyPlayedTracks({limit: 5})
      .then((response) => {
        const recentlyPlayedTracks = response.items;
        const savedTracks = recentlyPlayedTracks.map((item) => item.track);
        setSavedTracks(savedTracks);
      })
      .catch((error) => {
        console.error('Error getting recently played tracks:', error);
      });
  }, [recommendedTracks, setTopTracks, setRecommendedTracks, setSavedTracks]);

  return (
    <div className="widgets">
      <div className="widgets__container">
        <div className="widget__card">
          <h2 className="widget__title">Your Top 5 Tracks</h2>
          <div className="widget__list">
            {topTracks.map((track) => (
              <div className="widget__list-item" key={track.id}>
                <img
                  className="widget__list-image"
                  src={track.album?.images[0].url}
                  alt={track.name}
                />
                <div className="widget__list-description">
                  <p className="widget__list-name">{track.name}</p>
                  <p className="widget__list-artist">
                    {track.artists[0]?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="widget__card">
          <h2 className="widget__title">We recomend you these!</h2>
          <div className="widget__list">
            {recommendedTracks.map((track) => (
              <div className="widget__list-item" key={track.id}>
                <img
                  className="widget__list-image"
                  src={track.album?.images[0].url}
                  alt={track.name}
                />
                <div className="widget__list-description">
                  <p className="widget__list-name">{track.name}</p>
                  <p className="widget__list-artist">
                    {track.artists[0]?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="widget__card">
          <h2 className="widget__title">Your latest Songs Played</h2>
          <div className="widget__list">
            {savedTracks.map((track, index) => (
              <div className="widget__list-item" key={index}>
                <img
                  className="widget__list-image"
                  src={track.album?.images[0]?.url}
                  alt={track.name}
                />
                <div className="widget__list-description">
                  <p className="widget__list-name">{track.name}</p>
                  <p className="widget__list-artist">
                    {track.artists &&
                      track.artists.length > 0 &&
                      track.artists[0]?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
