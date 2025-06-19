import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const cursor = cursorRef.current;
    
    if (!grid || !cursor) return;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update cursor position
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out"
      });

      // Create ripple effect on grid
      const gridRect = grid.getBoundingClientRect();
      const relativeX = clientX - gridRect.left;
      const relativeY = clientY - gridRect.top;
      
      // Animate grid lines near cursor
      const gridLines = grid.querySelectorAll('.grid-line');
      gridLines.forEach((line, index) => {
        const lineElement = line as HTMLElement;
        const lineRect = lineElement.getBoundingClientRect();
        const lineCenterX = lineRect.left + lineRect.width / 2 - gridRect.left;
        const lineCenterY = lineRect.top + lineRect.height / 2 - gridRect.top;
        
        const distance = Math.sqrt(
          Math.pow(relativeX - lineCenterX, 2) + Math.pow(relativeY - lineCenterY, 2)
        );
        
        const maxDistance = 200;
        const opacity = Math.max(0, 1 - distance / maxDistance) * 0.3;
        
        gsap.to(lineElement, {
          opacity: opacity,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    };

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate grid lines
  const generateGridLines = () => {
    const lines = [];
    const spacing = 40;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Vertical lines
    for (let x = 0; x <= width; x += spacing) {
      lines.push(
        <div
          key={`v-${x}`}
          className="grid-line absolute bg-white/10"
          style={{
            left: x,
            top: 0,
            width: '1px',
            height: '100vh',
            opacity: 0.05
          }}
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      lines.push(
        <div
          key={`h-${y}`}
          className="grid-line absolute bg-white/10"
          style={{
            left: 0,
            top: y,
            width: '100vw',
            height: '1px',
            opacity: 0.05
          }}
        />
      );
    }

    return lines;
  };

  return (
    <>
      <div
        ref={gridRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ overflow: 'hidden' }}
      >
        {generateGridLines()}
      </div>
      
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-10 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen'
        }}
      />
    </>
  );
};

export default AnimatedGrid;