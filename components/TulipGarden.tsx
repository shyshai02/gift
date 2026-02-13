
import React from 'react';
import { motion } from 'framer-motion';

const GrowthWrapper: React.FC<{ 
  delay: number, 
  x: number, 
  y: number, 
  children: React.ReactNode 
}> = ({ delay, x, y, children }) => (
  <motion.g
    style={{ originX: `${x}px`, originY: `${y}px` }}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { scale: 0, opacity: 0 },
      visible: { 
        scale: [0, 1.6, 1],
        opacity: 1,
        transition: { 
          delay, 
          duration: 3, 
          times: [0, 0.6, 1],
          ease: "easeOut" 
        } 
      }
    }}
  >
    {children}
  </motion.g>
);

const StemAndLeaves: React.FC<{ x: number, y: number, scale: number, swayDuration: number }> = ({ x, y, scale, swayDuration }) => {
  const stemPath = `M ${x} ${y} Q ${x + 20} ${y - 100} ${x} ${y - 220}`;
  return (
    <>
      <motion.path
        d={stemPath}
        stroke="#166534"
        strokeWidth={5 * scale}
        strokeLinecap="round"
        fill="none"
        animate={{
          d: [
            `M ${x} ${y} Q ${x + 20} ${y - 100} ${x} ${y - 220}`,
            `M ${x} ${y} Q ${x - 10} ${y - 110} ${x + 10} ${y - 220}`,
            `M ${x} ${y} Q ${x + 20} ${y - 100} ${x} ${y - 220}`,
          ],
        }}
        transition={{
          duration: swayDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d={`M ${x} ${y - 60} Q ${x - 60} ${y - 100} ${x - 90} ${y - 50} Q ${x - 40} ${y - 40} ${x} ${y - 60}`}
        fill="#15803d"
        fillOpacity="0.6"
      />
      <motion.path
        d={`M ${x} ${y - 100} Q ${x + 70} ${y - 140} ${x + 100} ${y - 80} Q ${x + 50} ${y - 70} ${x} ${y - 100}`}
        fill="#15803d"
        fillOpacity="0.6"
      />
    </>
  );
};

const Tulip: React.FC<{ 
  delay: number, x: number, y: number, scale: number, color: string, glowColor: string, swayDuration: number 
}> = ({ delay, x, y, scale, color, glowColor, swayDuration }) => (
  <GrowthWrapper delay={delay} x={x} y={y}>
    <motion.circle cx={x} cy={y - 220} r={70 * scale} fill={glowColor} style={{ filter: 'blur(40px)' }} />
    <StemAndLeaves x={x} y={y} scale={scale} swayDuration={swayDuration} />
    <motion.g
      style={{ originX: `${x}px`, originY: `${y - 220}px` }}
      animate={{ rotate: [-2, 2, -2], x: [0, 10, 0] }}
      transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d={`M ${x} ${y - 220} C ${x - 50} ${y - 220} ${x - 60} ${y - 300} ${x} ${y - 320} C ${x + 60} ${y - 300} ${x + 50} ${y - 220} ${x} ${y - 220}`} fill={color} fillOpacity="0.8" />
      <path d={`M ${x} ${y - 215} C ${x - 40} ${y - 225} ${x - 45} ${y - 290} ${x} ${y - 310} C ${x + 45} ${y - 290} ${x + 40} ${y - 225} ${x} ${y - 215}`} fill={`url(#grad-tulip)`} />
    </motion.g>
  </GrowthWrapper>
);

const TulipGarden: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl aspect-[16/10] md:aspect-video flex items-center justify-center pointer-events-none overflow-hidden">
      <svg 
        viewBox="100 500 800 400" 
        className="w-full h-full filter drop-shadow-[0_0_50px_rgba(236,72,153,0.3)]"
        preserveAspectRatio="xMidYMid meet"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-tulip" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>

        {/* 5 Pink Tulips Arrangement */}
        <Tulip x={420} y={850} scale={0.9} delay={0.2} color="#f472b6" glowColor="rgba(244, 114, 182, 0.4)" swayDuration={6} />
        <Tulip x={580} y={850} scale={0.9} delay={0.5} color="#db2777" glowColor="rgba(219, 39, 119, 0.4)" swayDuration={5.5} />
        <Tulip x={500} y={880} scale={1.2} delay={0.8} color="#ec4899" glowColor="rgba(236, 72, 153, 0.6)" swayDuration={4.5} />
        <Tulip x={460} y={860} scale={0.8} delay={1.1} color="#f9a8d4" glowColor="rgba(249, 168, 212, 0.4)" swayDuration={5} />
        <Tulip x={540} y={860} scale={0.8} delay={1.4} color="#be185d" glowColor="rgba(190, 24, 93, 0.4)" swayDuration={5.2} />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={500 + (Math.random() - 0.5) * 600}
            cy={700 + (Math.random() - 0.5) * 300}
            r={1.5 + Math.random() * 2}
            fill="#fce7f3"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [0, -400],
              x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 150]
            }}
            transition={{ 
              delay: 3 + Math.random() * 5, 
              duration: 8 + Math.random() * 4, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default TulipGarden;
