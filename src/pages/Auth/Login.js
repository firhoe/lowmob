import React, {useRef} from 'react';
import {motion} from 'framer-motion';
import {loginUrl} from '../../utils/authorization';
import leftHand from '../../images/lecture-hand.webp';
import pinkCard from '../../images/pink-card.webp';
import ticket from '../../images/ticket.webp';
import './Login.css';

export default function Login() {
  const constraintsRef = useRef(null);

  return (
    <div className="login">
      <motion.div className="login__overlay" ref={constraintsRef}>
        <motion.img
          className="login__image-left-hand"
          src={leftHand}
          alt="left-hand"
          drag
          dragConstraints={constraintsRef}
        />
        <motion.img
          className="login__image-pink-card"
          src={pinkCard}
          alt="pink-card"
          drag
          dragConstraints={constraintsRef}
        />
        <motion.img
          className="login__image-ticket"
          src={ticket}
          alt="green-ticket"
          drag
          dragConstraints={constraintsRef}
        />
      </motion.div>
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
