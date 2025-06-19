import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Copy, FileText, Linkedin, Github, Twitter } from 'lucide-react';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('max@meekhoff.com');
    if (emailRef.current) {
      gsap.to(emailRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border/30">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span 
              ref={emailRef}
              className="text-white-soft font-medium cursor-pointer hover:text-gray-light transition-colors duration-300 tracking-wide"
              onClick={copyEmail}
            >
              max@meekhoff.com
            </span>
            <button 
              onClick={copyEmail}
              className="text-gray-medium hover:text-white-soft transition-colors duration-300"
            >
              <Copy size={16} />
            </button>
            <a 
              href="/cv.pdf" 
              className="text-gray-medium hover:text-white-soft transition-colors duration-300 flex items-center space-x-1"
            >
              <FileText size={16} />
              <span className="text-sm font-medium">CV</span>
            </a>
          </div>
          
          <nav className="flex items-center space-x-10">
            <a href="#work" className="text-white-soft hover:text-gray-light transition-colors duration-300 font-medium tracking-wide">Work</a>
            <a href="#about" className="text-white-soft hover:text-gray-light transition-colors duration-300 font-medium tracking-wide">About</a>
            <a href="#contact" className="text-white-soft hover:text-gray-light transition-colors duration-300 font-medium tracking-wide">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-5">
            <a href="https://linkedin.com" className="text-gray-medium hover:text-white-soft transition-colors duration-300">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com" className="text-gray-medium hover:text-white-soft transition-colors duration-300">
              <Github size={18} />
            </a>
            <a href="https://twitter.com" className="text-gray-medium hover:text-white-soft transition-colors duration-300">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;