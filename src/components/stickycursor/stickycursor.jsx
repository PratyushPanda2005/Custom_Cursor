"use client"
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, transform, animate } from 'framer-motion';
const StickyCursor = () => {
    const cursorSize = 20
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }
    // useMotionValue is required because React will not re render the compoenent on its own and the postion will always remian the same
    const manageMouseMove = (e) => { 
        const {clientX , clientY} = e
        mouse.x.set(clientX - cursorSize/2)
        mouse.y.set(clientY - cursorSize/2)
    }

    const smoothOptions = {damping: 20 , stiffness: 300 , mass: 0.5}

    const smoothMouse = {
        x: useSpring(mouse.x , smoothOptions),
        y: useSpring(mouse.y , smoothOptions)
    }
    // Creating a mouse object where i'm going to store the the position of mouse coming from a mouse move event
    useEffect(() => {
        window.addEventListener("mousemove",manageMouseMove)
        return () => {window.removeEventListener("mousemove",manageMouseMove)}
    })
  return (
    
      <motion.div
        className="fixed w-[20px] h-[20px] bg-black rounded-[50%] pointer-events-none"
        style={{left: smoothMouse.x , top: smoothMouse.y}}
        >
      </motion.div>
 
  )
}

export default StickyCursor