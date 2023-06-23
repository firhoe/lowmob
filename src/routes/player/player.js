import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../utils/store';
import spotifyApi from '../../utils/auth';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import QueueTracks from '../../components/QueueTracks/QueueTracks';
import './player.css';

export default function Player() {
  const { setTracks, setCurrentTrack } = useStore();
  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      const playlistId = location.state.id;

      spotifyApi.getPlaylistTracks(playlistId).then((response) => {
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
        setCurrentTrack(tracks[0]);
      });
    }
  }, [location.state, setTracks, setCurrentTrack]);
  

  return (
    <div className="container flex">
      <div className='player__container'>
        <UserInfoCard />
        <QueueTracks />
      </div>
      <div className="player__widgets"></div>
    </div>);
}
