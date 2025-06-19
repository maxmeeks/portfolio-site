import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Twitter, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={contactRef} className="py-24 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl font-light text-white-soft mb-8">
            Let's Work Together
          </h2>
          
          <p className="text-xl text-gray-light mb-16 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. 
            Let's create something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a 
              href="mailto:max@meekhoff.com"
              className="group bg-white-soft text-dark-bg px-8 py-4 rounded-full hover:bg-gray-light transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Send me an email</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
            
            <a 
              href="/cv.pdf"
              className="group border-2 border-white-soft text-white-soft px-8 py-4 rounded-full hover:bg-white-soft hover:text-dark-bg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Download CV</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
          
          <div className="flex justify-center space-x-8">
            <a 
              href="https://linkedin.com"
              className="text-gray-medium hover:text-white-soft transition-colors duration-300 flex items-center space-x-2"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com"
              className="text-gray-medium hover:text-white-soft transition-colors duration-300 flex items-center space-x-2"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://twitter.com"
              className="text-gray-medium hover:text-white-soft transition-colors duration-300 flex items-center space-x-2"
            >
              <Twitter size={24} />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;