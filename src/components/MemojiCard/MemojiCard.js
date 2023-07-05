import React from 'react';
import { motion } from "framer-motion";
import './MemojiCard.css';


export default function MemojiCard() {
  return (
    <div className="memoji">
      <motion.div
        className="memoji__image"
        drag
        dragConstraints={{
          top: -30,
          left: -30,
          right: 30,
          bottom: 30,
        }}
        whileHover={{scale: 1.2}}
        whileTap={{scale: 0.9}}
      />
    </div>
  );
}
