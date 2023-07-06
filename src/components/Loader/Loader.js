import React from 'react';
import {motion} from 'framer-motion';
import {useStore} from '../../utils/store';
import './Loader.css';

export default function Loader() {
  const isLoading = useStore((state) => state.isLoading);

  return (
    <>
      {isLoading && (
        <motion.div
          className="loader"
          initial={{x: 0, opacity: 1}}
          animate={{x: 0, opacity: 0}}
          transition={{ease: 'linear', duration: 1, x: {duration: 1}}}>
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </motion.div>
      )}
    </>
  );
}
