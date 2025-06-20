import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
	const aboutRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.fromTo(
			contentRef.current,
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 80%",
				},
			}
		);
	}, []);

	return (
		<section
			id="about"
			ref={aboutRef}
			className="py-24 border-y border-white relative"
		>
			<div
				className="
				absolute
				top-0
				left-0
				p-6              
				text-sm
				font-mono
				text-white/70"
			>
				02 // ABOUT
			</div>
			<div className="max-w-4xl mx-auto px-6">
				<div ref={contentRef}>
					<h2 className="text-4xl md:text-5xl font-light text-white-soft mb-12 text-center">
						About Me
					</h2>

					<div className="prose prose-lg max-w-none text-gray-light leading-relaxed">
						<p className="text-xl mb-8">
							I'm a creative frontend developer with over 6 years
							of experience building digital products and
							commercial web applications that bridge the gap
							between design and technology.
						</p>

						<p className="text-xl mb-8">
							My approach combines technical expertise with
							creative vision to deliver solutions that not only
							function flawlessly but also provide exceptional
							user experiences. I specialize in modern web
							technologies, collaborative team work, and
							interactive design.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
