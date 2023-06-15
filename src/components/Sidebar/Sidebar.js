import React from 'react';
import './Sidebar.css';
import SidebarButton from './SidebarButton';

import skullShape from '../../images/skull-shape.webp';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <button className="sidebar__button"></button>
      <div>
        <SidebarButton
          title="Feed"
          to="/feed"
          icon={<img src="../../images/disk.png" alt="feed" />}
        />
        <SidebarButton
          title="Player"
          to="/player"
          icon={<img src="../../images/disk.png" alt="feed" />}
        />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<img src="../../images/disk.png" alt="feed" />}
        />
        <SidebarButton
          title="Playlist"
          to="/"
          icon={<img src="../../images/disk.png" alt="feed" />}
        />
      </div>
      <SidebarButton
        title="Sign Out"
        to=""
        icon={<img src={skullShape} alt="feed" />}
      />
    </div>
  );
}
