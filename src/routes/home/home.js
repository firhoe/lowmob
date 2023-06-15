import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Playlist from '../playlist/playlist';
import Player from '../player/player';
import Favorites from '../favorites/favorites';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./home.css";

export default function Home() {
  return (
    <Router>
      <div className='main'>
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
