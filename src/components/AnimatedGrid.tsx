import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const AnimatedGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateGridDimensions = () => {
      setGridDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);

    return () => {
      window.removeEventListener('resize', updateGridDimensions);
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    const cursorGlow = cursorGlowRef.current;
    
    if (!grid || !cursorGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Update cursor glow position
      gsap.to(cursorGlow, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: "power2.out"
      });

      // Animate grid lines near cursor
      const gridLines = grid.querySelectorAll('.grid-line');
      gridLines.forEach((line) => {
        const lineElement = line as HTMLElement;
        const lineRect = lineElement.getBoundingClientRect();
        
        let lineCenterX, lineCenterY;
        
        if (lineElement.classList.contains('vertical')) {
          lineCenterX = lineRect.left;
          lineCenterY = clientY;
        } else {
          lineCenterX = clientX;
          lineCenterY = lineRect.top;
        }
        
        const distance = Math.sqrt(
          Math.pow(clientX - lineCenterX, 2) + Math.pow(clientY - lineCenterY, 2)
        );
        
        const maxDistance = 150;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        const opacity = 0.05 + (intensity * 0.4);
        const blur = Math.max(0, 2 - (intensity * 2));
        
        gsap.to(lineElement, {
          opacity: opacity,
          filter: `blur(${blur}px)`,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    };

    const handleMouseLeave = () => {
      // Reset all grid lines when mouse leaves
      const gridLines = grid.querySelectorAll('.grid-line');
      gridLines.forEach((line) => {
        gsap.to(line, {
          opacity: 0.05,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: "power2.out"
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gridDimensions]);

  const generateGridLines = () => {
    const lines = [];
    const spacing = 50;
    const { width, height } = gridDimensions;

    // Vertical lines
    for (let x = 0; x <= width; x += spacing) {
      lines.push(
        <div
          key={`v-${x}`}
          className="grid-line vertical absolute bg-gradient-to-b from-white/20 via-white/10 to-white/20"
          style={{
            left: x,
            top: 0,
            width: '1px',
            height: '100vh',
            opacity: 0.05,
            filter: 'blur(0px)'
          }}
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      lines.push(
        <div
          key={`h-${y}`}
          className="grid-line horizontal absolute bg-gradient-to-r from-white/20 via-white/10 to-white/20"
          style={{
            left: 0,
            top: y,
            width: '100vw',
            height: '1px',
            opacity: 0.05,
            filter: 'blur(0px)'
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
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {generateGridLines()}
      </div>
      
      <div
        ref={cursorGlowRef}
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.02) 60%, transparent 100%)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
          filter: 'blur(1px)'
        }}
      />
      
      {/* Additional smaller glow for more intensity */}
      <div
        className="fixed pointer-events-none z-10 w-48 h-48 rounded-full opacity-20"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />
    </>
  );
};

export default AnimatedGrid;