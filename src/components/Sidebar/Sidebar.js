import React from 'react';
import './Sidebar.css';
import SidebarButton from './SidebarButton';

import skullShape from '../../images/skull-shape.webp';
import deformPaper from '../../images/deform-paper.webp';
import eggIcon from '../../images/egg.png'
import ballIcon from '../../images/ball.webp';
import folderIcon from '../../images/folder.svg';


export default function Sidebar( ) {

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
        <SidebarButton
          title="Player"
          to="/player"
          icon={
            <img
              src={ballIcon}
              alt="player"
              className="sidebar__icon sidebar__icon-ball"
            />
          }
        />
        <SidebarButton
          title="Artists"
          to="/artists"
          icon={
            <img
              src={eggIcon}
              alt="artists"
              className="sidebar__icon sidebar__icon-egg"
            />
          }
        />
      </div>
      <SidebarButton
        to=""
        icon={
          <img
            src={skullShape}
            alt="logout"
            className="sidebar__icon sidebar__icon-skull"
          />
        }
        logOut
      />
    </div>
  );
}
