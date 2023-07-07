import React, {useEffect, useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import './Popup.css';

export default function Popup({handleLogout, handleStay}) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleStay();
      }
    };

    const handleClosePopup = (event) => {
      if (event.key === 'Escape') {
        handleStay();
      }
    };

    window.addEventListener('keydown', handleClosePopup);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleClosePopup);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleStay]);

  return (
    <AnimatePresence>
      <motion.div
        className="popup"
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -50, transition: {duration: 0.5}}}>
        <div className="popup__container" ref={popupRef}>
          <div className="popup__image" alt="good bye"></div>
          <p className="popup__title">You leaving us?</p>
          <div className="popup__buttons">
            <motion.button
              className="popup__button"
              onClick={handleLogout}
              whileHover={{scale: 1.1}}>
              Yep, bye
            </motion.button>
            <motion.button
              className="popup__button"
              onClick={handleStay}
              whileHover={{scale: 1.1}}>
              Nope
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
