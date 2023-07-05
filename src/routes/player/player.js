import React, { useEffect } from 'react';
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
    const fetchData = async () => {

      if (spotifyToken) {
        const storedPlaylistId = localStorage.getItem('selectedPlaylistId');
        let playlistId = storedPlaylistId;

        if (location.state && location.state.id) {
          playlistId = location.state.id;
          localStorage.setItem('selectedPlaylistId', playlistId);
        } else if (!storedPlaylistId && playlists.length > 0) {
          playlistId = playlists[0].id;
          localStorage.setItem('selectedPlaylistId', playlistId);
        }

        const response = await spotifyApi.getPlaylistTracks(playlistId);
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
        setCurrentTrack(tracks[0]);
      }
    };

    fetchData();
  }, [spotifyToken, location.state, playlists, setTracks, setCurrentTrack]);


  return (
    <div className="container flex">
      <div className="player__container">
        <UserInfoCard />
        <QueueTracks />
        <AudioPlayer />
      </div>
    </div>
  );
}
