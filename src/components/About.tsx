import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
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
    <section id="about" ref={aboutRef} className="py-24 bg-cream-dark">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl font-light text-black-soft mb-12 text-center">
            About Me
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-warm leading-relaxed">
            <p className="text-xl mb-8">
              I'm a creative developer and designer with over 5 years of experience 
              building digital products that bridge the gap between design and technology.
            </p>
            
            <p className="mb-8">
              My approach combines technical expertise with creative vision to deliver 
              solutions that not only function flawlessly but also provide exceptional 
              user experiences. I specialize in modern web technologies, brand identity, 
              and interactive design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div>
                <h3 className="text-2xl font-medium text-black-soft mb-6">Skills</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Frontend Development</span>
                    <div className="w-32 h-2 bg-gray-light rounded-full">
                      <div className="w-30 h-2 bg-black-soft rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>UI/UX Design</span>
                    <div className="w-32 h-2 bg-gray-light rounded-full">
                      <div className="w-28 h-2 bg-black-soft rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Brand Design</span>
                    <div className="w-32 h-2 bg-gray-light rounded-full">
                      <div className="w-26 h-2 bg-black-soft rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Motion Design</span>
                    <div className="w-32 h-2 bg-gray-light rounded-full">
                      <div className="w-24 h-2 bg-black-soft rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium text-black-soft mb-6">Experience</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-black-soft">Senior Designer</h4>
                    <p className="text-gray-warm">Tech Startup • 2022-Present</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black-soft">Product Designer</h4>
                    <p className="text-gray-warm">Design Agency • 2020-2022</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-black-soft">Frontend Developer</h4>
                    <p className="text-gray-warm">Freelance • 2019-2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;