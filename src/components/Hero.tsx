import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate circle
    tl.fromTo(circleRef.current,
      { scale: 0, rotation: 180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    );
    
    // Animate name
    tl.fromTo(nameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );
    
    // Animate title
    tl.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
    
    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
    
    // Animate button
    tl.fromTo(buttonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Floating animation for circle
    gsap.to(circleRef.current, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen bg-dark-bg flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div 
          ref={circleRef}
          className="w-24 h-24 bg-white-soft rounded-full mx-auto mb-16 shadow-2xl shadow-white/10"
        />
        
        <h1 
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white-soft leading-tight mb-6"
        >
          Max Meekhoff
        </h1>
        
        <h2 
          ref={titleRef}
          className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-light leading-relaxed mb-8"
        >
          Building digital products,<br />
          brands, and <span className="text-white-soft font-normal">experience.</span>
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-medium mb-12 max-w-2xl mx-auto"
        >
          Creative developer and designer focused on crafting exceptional 
          digital experiences that make a lasting impact.
        </p>
        
        <button 
          ref={buttonRef}
          onClick={scrollToWork}
          className="group bg-white-soft text-dark-bg px-8 py-4 rounded-full hover:bg-gray-light transition-all duration-300 flex items-center space-x-2 mx-auto"
        >
          <span>Latest Work</span>
          <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;