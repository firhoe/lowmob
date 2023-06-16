import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Playlist from '../playlist/playlist';
import Player from '../player/player';
import Favorites from '../favorites/favorites';
import Sidebar from '../../components/Sidebar/Sidebar';
import Login from '../../routes/auth/login';
import './home.css';
import spotifyApi, { getTokenFromUrl } from '../../utils/auth';

export default function Home() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = '';

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        console.log(user);
      });
      setLoggedIn(true);
    }
  }, []);

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
