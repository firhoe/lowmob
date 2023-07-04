import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useStore} from '../../utils/store';
import './SidebarButton.css';

export default function SidebarButton(props) {
  const location = useLocation();
  const { setShowPopup } = useStore();

  const logout = () => {
    if (props.logOut) {
      setShowPopup();
    }
  };

  const isActive = location.pathname === props.to;

  return (
    <Link to={props.to} onClick={logout}>
      <div className={`sidebar__button ${isActive ? 'active' : ''}`}>
        {props.icon}
        <p className="sidebar__title">{props.title}</p>
      </div>
    </Link>
  );
}
