import React from 'react';
import {useLocation} from 'react-router-dom';
import dizzyPic from '../../images/dizzy.webp';
import './Error.css';

export default function Error() {
  const location = useLocation();
  const {error} = location.state || {};

  return (
    <section className="error">
      <img className="error__image" src={dizzyPic} alt="lost-icon" />
      <h2 className="error__title">Oops...</h2>
      <p className="error__text">An error occurred: {error && error.message}</p>
      <p className="error__text">
        Try returning to 🡒{' '}
        <a className="error__link" href="/">
          homepage
        </a>
      </p>
    </section>
  );
}
