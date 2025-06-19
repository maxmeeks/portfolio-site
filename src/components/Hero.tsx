import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Animate name with a more dramatic entrance
    tl.fromTo(nameRef.current,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );
    
    // Animate title
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
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

    // Add subtle floating animation to the entire hero content
    gsap.to([nameRef.current, titleRef.current, subtitleRef.current], {
      y: -5,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen bg-dark-bg flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl mx-auto text-center">        
        <h1 
          ref={nameRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white-soft leading-tight mb-8 tracking-tight"
        >
          Max Meekhoff
        </h1>
        
        <h2 
          ref={titleRef}
          className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-light leading-relaxed mb-10 tracking-wide"
        >
          Building digital products,<br />
          brands, and <span className="text-white-soft font-medium bg-gradient-to-r from-white-soft to-gray-light bg-clip-text text-transparent">experience.</span>
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-medium mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Creative developer and designer focused on crafting exceptional 
          digital experiences that make a lasting impact.
        </p>
        
        <button 
          ref={buttonRef}
          onClick={scrollToWork}
          className="group bg-white-soft text-dark-bg px-10 py-5 rounded-full hover:bg-gray-light transition-all duration-300 flex items-center space-x-3 mx-auto font-medium text-lg shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-105"
        >
          <span>Latest Work</span>
          <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;