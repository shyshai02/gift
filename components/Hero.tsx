
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroProps {
  scrollProgress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ scrollProgress }) => {
  // Transform values for the main title
  const mainOpacity = useTransform(scrollProgress, [0, 0.35], [1, 0]);
  const mainScale = useTransform(scrollProgress, [0, 0.35], [1, 1.2]);
  const mainBlur = useTransform(scrollProgress, [0, 0.35], [0, 10]);

  // Transform values for "Keep scrolling..."
  const midOpacity = useTransform(scrollProgress, [0.3, 0.45, 0.65], [0, 1, 0]);
  const midY = useTransform(scrollProgress, [0.3, 0.45, 0.65], [40, 0, -40]);

  // Transform values for "Almost there..."
  const endOpacity = useTransform(scrollProgress, [0.6, 0.8, 1], [0, 1, 0]);
  const endY = useTransform(scrollProgress, [0.6, 0.8, 1], [40, 0, -40]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none font-medium">
      <motion.div
        style={{ opacity: mainOpacity, scale: mainScale, filter: `blur(${mainBlur}px)` }}
        className="mb-20"
      >
        <h1 className="text-3xl md:text-5xl font-medium mb-4 text-pink-50">
          For you <span className="font-romantic text-pink-400 text-4xl md:text-6xl px-2">Shamel</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 tracking-widest font-medium">
          This page was made by your developer
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: midOpacity, y: midY }}
        className="mb-20"
      >
        <p className="text-2xl md:text-4xl font-romantic text-pink-200">
          Keep scrolling...
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: endOpacity, y: endY }}
      >
        <p className="text-2xl md:text-4xl font-romantic text-pink-400">
          Almost there, my Moon...
        </p>
      </motion.div>

      {/* Floating indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-pink-800 font-medium">Scroll Down</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-pink-500 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
};

export default Hero;
