import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Textbar() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorHeight = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorHeightSpring = useSpring(cursorHeight, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Get the element under the cursor
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (element instanceof HTMLElement) {
      const elementRect = element.getBoundingClientRect();
      cursorHeight.set(elementRect.height);
      // Adjust X position to be exactly at cursor position
      cursorX.set(e.clientX - rect.left - 1); // Subtract half of cursor width (2px) for perfect centering
      // Center the bar vertically relative to the text
      cursorY.set(e.clientY - rect.top - elementRect.height / 2);
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center gap-16 p-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >  
      </motion.div>

      <motion.div 
        ref={containerRef}
        className="relative max-w-2xl mx-auto text-center p-12 rounded-xl "
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="space-y-8">
          <h1 className="text-5xl font-bold  tracking-tight">
            Hover over this text
          </h1>
          <p className="text-2xl  leading-relaxed">
            Watch as the selection cursor follows your mouse movement with precise alignment
          </p>
          <p className="text-xl">
            The cursor height adapts to match the text size
          </p>
        </div>
          
        <motion.div
          className="absolute w-[2px] bg-pink-500"
          style={{
            height: cursorHeightSpring,
            x: cursorXSpring,
            y: cursorYSpring,
            opacity: isHovered ? 1 : 0,
            filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{
            opacity: { duration: 0.2 },
          }}
        />
      </motion.div>
    </div>
  );
}

export default Textbar;