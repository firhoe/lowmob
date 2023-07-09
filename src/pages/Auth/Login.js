import React from 'react';
import {loginUrl} from '../../utils/authorization';
import './Login.css';

export default function Login() {
  return (
    <div className="login">
      <div className="login__overlap"></div>
      <figure className="login__memoji" />
      <div className="login__text-container">
        <a href={loginUrl}>
          <button className="login__button">Link up ✹ Spotify</button>
        </a>
        <p className="login__text">Welcome back, human.</p>
        <a
          href="https://github.com/firhoe"
          target="_blank"
          rel="noopener noreferrer"
          className="login__text">
          Made by Firhoe
        </a>
      </div>
    </div>
  );
}
