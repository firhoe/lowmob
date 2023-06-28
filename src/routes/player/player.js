import React from 'react';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useStore} from '../../utils/store';
import spotifyApi from '../../utils/auth';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import QueueTracks from '../../components/QueueTracks/QueueTracks';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import './player.css';

export default function Player() {
  const {spotifyToken, setSpotifyToken, setTracks, setCurrentTrack, playlists} =
    useStore();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyToken');

    if(storedToken) {
      setSpotifyToken(storedToken);
      spotifyApi.setAccessToken(storedToken);
    }
  }, [setSpotifyToken])


  useEffect(() => {
    if (spotifyToken && location.state) {
      const playlistId = location.state.id;

      spotifyApi.getPlaylistTracks(playlistId).then((response) => {
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
        setCurrentTrack(tracks[0]);
      });
    } else if (spotifyToken && playlists.length > 0) {
      const firstPlaylistId = playlists[0].id;

      spotifyApi.getPlaylistTracks(firstPlaylistId).then((response) => {
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
        setCurrentTrack(tracks[0]);
      });
    }
  }, [spotifyToken, location.state, setTracks, setCurrentTrack, playlists]);

  return (
    <div className="container flex">
      <div className="player__container">
        <UserInfoCard />
        <QueueTracks />
        <AudioPlayer />
      </div>
      <div className="player__widgets"></div>
    </div>
  );
}
