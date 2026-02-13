
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import TulipGarden from './components/TulipGarden';

const App: React.FC = () => {
  const [stage, setStage] = useState<'scroll' | 'invite' | 'celebrate'>('scroll');
  
  // High-performance scroll tracking
  const { scrollY, scrollYProgress } = useScroll();
  
  // Add inertia/smoothing to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle stage transitions based on raw scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    const windowHeight = window.innerHeight;
    if (latest >= windowHeight * 1.8 && stage === 'scroll') {
      setStage('invite');
    }
  });

  const handleYes = () => {
    setStage('celebrate');
    // Ensure we start at the top for the transition
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleBack = () => {
    setStage('scroll');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${stage === 'celebrate' ? 'min-h-screen' : 'min-h-[300vh]'} bg-slate-950 overflow-x-hidden font-medium text-pink-50`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-60" />
      </div>

      <AnimatePresence mode="wait">
        {stage === 'scroll' && (
          <Hero scrollProgress={smoothProgress} key="hero" />
        )}

        {stage === 'invite' && (
          <motion.div 
            key="invite"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 font-medium"
          >
            <Invitation onYes={handleYes} />
          </motion.div>
        )}

        {stage === 'celebrate' && (
          <motion.div 
            key="celebrate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-50 flex flex-col items-center min-h-screen px-4 sm:px-6"
          >
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            
            {/* Celebration Container */}
            <motion.div
              initial={{ y: "25vh" }}
              animate={{ y: "0vh" }}
              transition={{ 
                delay: 6.4,
                duration: 2.5, 
                ease: "easeInOut" 
              }}
              className="w-full flex flex-col items-center"
            >
                <div className="w-full max-w-4xl flex justify-center mb-[-20px] md:mb-[-60px]">
                    <TulipGarden />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 8.4, duration: 2, ease: "easeOut" }}
                  className="text-center max-w-2xl w-full z-10 space-y-6 md:space-y-8 pb-24"
                >
                  <div className="px-2">
                      <h1 className="text-3xl md:text-7xl font-romantic text-pink-50 mb-2 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                        Happy Valentine’s Day, Shamel.
                      </h1>
                      <p className="text-sm md:text-xl text-pink-300/80 font-medium tracking-[0.2em] uppercase">
                        I love you so much, my Moon. ❤️
                      </p>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 10, duration: 1.5 }}
                    className="bg-slate-900/60 backdrop-blur-md border border-pink-500/20 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_40px_rgba(236,72,153,0.15)] relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-pink-500/30 rounded-tl-[1.5rem] md:rounded-tl-[2rem] group-hover:border-pink-400/50 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-pink-500/30 rounded-br-[1.5rem] md:rounded-br-[2rem] group-hover:border-pink-400/50 transition-colors" />

                    <p className="text-slate-200 text-sm md:text-xl leading-relaxed font-medium italic text-left first-letter:text-4xl md:first-letter:text-5xl first-letter:font-romantic first-letter:text-pink-400 first-letter:mr-2 first-letter:float-left">
                      Hi Mahal ko Happy Valentine`s Days hihi, sorry eto lang ang gift ko HAHAHAHA wala kase ako pera and sana maging happy ka sa simpleng gift ko na ito pero ill promise bb babawi ako kapag meron akong money, anyways I know this first time ulit na mag love letter ako sayo pero upgraded website na hindi nakupas at nawawala or hindi mo makakalimutan kung saan nakalagay mwhehehe ginawa ko to para everytime na you sad eh ioopen mo lang ito always tong open for you and i hope you will be happy sa simple gift ko Mahal na mahal kita may Moon. Happy Valentines day hihi.
                    </p>

                    <div className="mt-8 pt-6 border-t border-pink-500/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05, x: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleBack}
                          className="text-slate-400 hover:text-pink-400 text-xs md:text-sm font-medium uppercase tracking-widest flex items-center gap-2 transition-colors"
                        >
                          <span className="text-lg">←</span> Back
                        </motion.button>
                        <p className="font-romantic text-xl md:text-2xl text-pink-400">
                            Always yours, <span className="text-pink-300">Forever.</span>
                        </p>
                    </div>
                  </motion.div>
                </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for scrolling */}
      {stage !== 'celebrate' && <div className="h-[300vh] pointer-events-none" />}
    </div>
  );
};

export default App;
