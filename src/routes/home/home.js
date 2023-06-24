import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Playlist from '../playlist/playlist';
import Player from '../player/player';
import Favorites from '../favorites/favorites';
import Sidebar from '../../components/Sidebar/Sidebar';
import Login from '../../routes/auth/login';
import './home.css';
import {useStore} from '../../utils/store';
import spotifyApi, {getTokenFromUrl} from '../../utils/auth';

export default function Home() {
  const {spotifyToken, setSpotifyToken, loggedIn, setLoggedIn} = useStore();

  useEffect(() => {
    const token = getTokenFromUrl().access_token;
    window.location.hash = '';

    if (token) {
      localStorage.setItem('spotifyToken', token);
      setSpotifyToken(token);
      spotifyApi.setAccessToken(token);
      spotifyApi.getMe().then((user) => {
        console.log(user);
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
          <Route path="/" element={<Playlist />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  ); 
}
