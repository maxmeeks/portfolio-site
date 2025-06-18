import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with advanced filtering, real-time inventory, and seamless checkout experience.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.pexels.com/photos/4968660/pexels-photo-4968660.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "Brand Design System",
    description: "Comprehensive design system and component library for a fintech startup, ensuring consistency across all platforms.",
    tags: ["Figma", "React", "Storybook", "TypeScript"],
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example.com"
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for analytics and reporting with real-time data visualization and custom metrics.",
    tags: ["D3.js", "React", "Python", "PostgreSQL"],
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and advanced transaction management.",
    tags: ["React Native", "Firebase", "Plaid API"],
    image: "https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example.com"
  }
];

const Work: React.FC = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      }
    );

    // Projects stagger animation
    projectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(project,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%"
            }
          }
        );
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  return (
    <section id="work" ref={workRef} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-light text-black-soft mb-16 text-center"
        >
          Selected Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              ref={addToRefs}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black-soft/0 group-hover:bg-black-soft/20 transition-colors duration-300" />
                
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      className="bg-cream p-2 rounded-full hover:bg-cream-dark transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="text-black-soft" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      className="bg-cream p-2 rounded-full hover:bg-cream-dark transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="text-black-soft" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-2xl font-medium text-black-soft mb-3 group-hover:text-gray-warm transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-warm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-sm bg-cream-dark text-black-soft px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;