import React from 'react';
import {Link, useLocation } from 'react-router-dom';
import './SidebarButton.css';

export default function SidebarButton(props) {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  
  return (
    <Link to={props.to}>
      <div className={`sidebar__button ${isActive ? 'active' : ''}`}>
        {props.icon}
        <p className={`sidebar__title ${isActive ? 'active' : ''}`}>
          {props.title}
        </p>
      </div>
    </Link>
  );
}
