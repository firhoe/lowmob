import React from 'react';
import './Sidebar.css';
import SidebarButton from './SidebarButton';

import skullShape from '../../images/skull-shape.webp';
import deformPaper from '../../images/deform-paper.webp';
import greenIcon from '../../images/green-icon.webp';
import ballIcon from '../../images/ball.webp';
import folderIcon from '../../images/folder.svg';


export default function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarButton
        title="About"
        to=""
        icon={
          <img
            src={deformPaper}
            alt="home"
            className="sidebar__icon sidebar__icon-paper"
          />
        }
      />
      <div className="sidebar__button-group">
        <SidebarButton
          title="Player"
          to="/player"
          icon={
            <img
              src={greenIcon}
              alt="player"
              className="sidebar__icon sidebar__icon-green"
            />
          }
        />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={
            <img
              src={ballIcon}
              alt="favorites"
              className="sidebar__icon sidebar__icon-ball"
            />
          }
        />
        <SidebarButton
          title="Playlist"
          to="/"
          icon={
            <img
              src={folderIcon}
              alt="playlist"
              className="sidebar__icon sidebar__icon-folder "
            />
          }
        />
      </div>
      <SidebarButton
        title="Logout"
        to=""
        icon={
          <img
            src={skullShape}
            alt="logout"
            className="sidebar__icon sidebar__icon-skull"
          />
        }
      />
    </div>
  );
}
