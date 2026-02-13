
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface InvitationProps {
  onYes: () => void;
}

const Invitation: React.FC<InvitationProps> = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    // Generate random position within a reasonable radius
    const radius = 150;
    const randomX = (Math.random() - 0.5) * radius * 2;
    const randomY = (Math.random() - 0.5) * radius * 2;
    
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-pink-500/30 p-8 md:p-12 rounded-[2rem] shadow-[0_0_50px_rgba(236,72,153,0.15)] text-center max-w-lg w-full font-medium">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-pink-400 text-5xl mb-6 block">💌</span>
        <h2 className="text-3xl md:text-4xl font-romantic text-pink-100 mb-6">
          Shamel, will you be my Valentine?
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed italic font-medium">
          "The moon and the stars are witnesses to how much you mean to me."
        </p>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
            className="px-10 py-3 bg-pink-600 hover:bg-pink-500 text-white font-medium rounded-full transition-all duration-300 z-10 shadow-lg shadow-pink-900/20"
          >
            Yes, I will!
          </motion.button>

          <motion.button
            ref={noButtonRef}
            animate={{ x: noPosition.x, y: noPosition.y }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="px-10 py-3 border border-slate-700 text-slate-400 rounded-full cursor-not-allowed transition-colors font-medium"
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Invitation;
