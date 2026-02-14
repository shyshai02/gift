import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const VoiceMessage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleError = () => {
    if (audioRef.current) {
      console.error('Audio error:', audioRef.current.error);
      setError('Failed to load audio. Please try again.');
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setError(null);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Sound wave bars animation variants
  const barVariants = {
    idle: { height: 8 },
    playing: (i: number) => ({
      height: [8, Math.random() * 20 + 10, 8],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: i * 0.1,
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 10.5, duration: 1 }}
      className="w-full"
    >
      <audio
        ref={audioRef}
        src="/Update Voice Recored.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-md border border-pink-500/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_40px_rgba(236,72,153,0.15)] relative overflow-hidden group"
      >
        {/* Animated background hearts */}
        <motion.div
          className="absolute top-4 right-4 text-pink-500/20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-4 text-pink-500/20"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          💕
        </motion.div>

        <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-pink-500/30 rounded-tl-[1.5rem] md:rounded-tl-[2rem] group-hover:border-pink-400/50 transition-colors" />
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-pink-500/30 rounded-br-[1.5rem] md:rounded-br-[2rem] group-hover:border-pink-400/50 transition-colors" />

        <div className="flex flex-col items-center gap-6">
          {/* Header with hearts */}
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pink-400 text-4xl mb-2 block"
            >
              🎤
            </motion.div>
            <p className="text-slate-200 text-sm md:text-base font-medium">
              A voice message from Angelo
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 11 }}
              className="text-pink-400/60 text-xs mt-1 italic"
            >
              Tap to listen 💖
            </motion.p>
          </div>

          {/* Sound Wave Visualization */}
          <div className="flex items-center justify-center gap-1 h-12 w-full">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={barVariants}
                initial="idle"
                animate={isPlaying ? "playing" : "idle"}
                className="w-1.5 bg-gradient-to-t from-pink-500 to-rose-400 rounded-full"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm bg-red-900/30 px-4 py-2 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Play/Pause Button - Single Button */}
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236,72,153,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-pink-600 to-rose-600 shadow-lg shadow-pink-900/30 hover:from-pink-500 hover:to-rose-500"
          >
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          {/* Progress Bar with Time */}
          <div className="w-full max-w-xs">
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20" />
              
              {/* Progress fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 rounded-full relative"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                {/* Glowing tip */}
                <div className="absolute right-0 top-0 h-full w-2 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </div>
            
            {/* Time display */}
            <div className="flex justify-between mt-2">
              <p className="text-xs text-pink-400/80 font-medium">
                {formatTime(currentTime)}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {isPlaying ? 'Playing...' : formatTime(duration)}
              </p>
            </div>
          </div>

          {/* Heart decorations */}
          <motion.div 
            className="flex gap-2"
            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          >
            <span className="text-pink-500/40">💗</span>
            <span className="text-rose-500/40">💖</span>
            <span className="text-pink-500/40">💗</span>
            <span className="text-rose-500/40">💖</span>
            <span className="text-pink-500/40">💗</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceMessage;
