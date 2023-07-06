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
          animate={{x: 0,}}
          transition={{
            ease: 'easeOut',
            duration: 2,
          }}>
          <div className="loader__memoji"></div>
        </motion.div>
      )}
    </>
  );
}
