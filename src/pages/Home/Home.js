import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from '../Profile/Profile';
import Playlist from '../Playlist/Playlist';
import Player from '../Player/Player';
import Artists from '../Artists/Artists';
import Sidebar from '../../components/Sidebar/Sidebar';
import Login from '../Auth/Login';
import {useStore} from '../../utils/store';
import {spotifyApi, getTokenFromUrl} from '../../utils/authorization';
import './Home.css';

export default function Home() {
  const {setSpotifyToken, loggedIn, setLoggedIn} = useStore();

  useEffect(() => {
    const token = getTokenFromUrl().access_token;
    window.location.hash = '';

    if (token) {
      setSpotifyToken(token);
      spotifyApi.setAccessToken(token);
      spotifyApi
        .getMe()
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.error('Error occurred while fetching user data:', error);
        });
      setLoggedIn(true);
    }
  }, [setSpotifyToken, setLoggedIn]);

  return !loggedIn ? (
    <Login />
  ) : (
    <Router>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/player" element={<Player />} />
          <Route path="/artists" element={<Artists />} />
        </Routes>
      </div>
    </Router>
  );
}
