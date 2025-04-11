"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import useMousePosition from './utils/useMousePosition.js';
export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;
  return (
    <main className="main">
     <motion.div 
        className="mask"
        animate={{
          WebkitMaskPosition: `${(x ?? 0) - (size / 2)}px ${(y ?? 0) - (size / 2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration:0.5}}
      >
          <p className='' onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
            A visual designer - with skills that haven&apos;t been replaced by A.I (yet) - making good shit only if the paycheck is equally good.
          </p>
      </motion.div>

      <div className="body">
        <p className='font-quicksand'>I&apos;m a <span>selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.</p>
      </div>
    </main>
  );
}
