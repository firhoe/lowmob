import React, {useEffect, useRef} from 'react';
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
    <div className="popup">
      <div className="popup__container" ref={popupRef}>
        <div className='popup__image' alt='good bye'></div>
        <p className="popup__title">You leaving us?</p>
        <div className="popup__buttons">
          <button
            className="popup__button popup__button-pan"
            onClick={handleLogout}>
            <span>Yep, bye</span>
          </button>
          <button
            className="popup__button popup__button-pan"
            onClick={handleStay}>
            <span>Nope</span>
          </button>
        </div>
      </div>
    </div>
  );
}
