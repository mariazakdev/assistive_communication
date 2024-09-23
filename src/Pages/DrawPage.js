import React, { useEffect, useRef, useState } from 'react';
import aaah from '../Assets/Sounds/Draaaaw.m4a';

export default function DrawPage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const soundRef = useRef(new Audio(aaah)); // Ref to store the sound

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw fireworks effect
    function drawFireworks(x, y) {
      const gradient = context.createRadialGradient(x, y, 0, x, y, 20);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      
      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2, false);
      context.fillStyle = gradient;
      context.fill();
    }

    function handleDraw(event) {
      event.preventDefault(); // Prevent scrolling on touch devices
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left || event.touches[0].clientX - rect.left;
      const y = event.clientY - rect.top || event.touches[0].clientY - rect.top;

      drawFireworks(x, y);
    }

    function startDrawing(event) {
      event.preventDefault(); // Prevent scrolling on touch devices
      setIsDrawing(true);
      handleDraw(event);
      playSound(); // Play sound when drawing starts
    }

    function stopDrawing(event) {
      event.preventDefault(); // Prevent scrolling on touch devices
      setIsDrawing(false);
      stopSound(); // Optionally stop or reset sound when drawing stops
    }

    function draw(event) {
      if (!isDrawing) return;
      handleDraw(event);
    }

    function playSound() {
      soundRef.current.currentTime = 0; // Reset sound to the beginning
      soundRef.current.play();
    }

    function stopSound() {
      soundRef.current.pause();
      soundRef.current.currentTime = 0; // Reset sound
    }

    // Disable scrolling by preventing default behavior for touch events
    window.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    // Mouse Events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    // Touch Events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      window.removeEventListener('touchmove', (e) => e.preventDefault());
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
    </div>
  );
}
