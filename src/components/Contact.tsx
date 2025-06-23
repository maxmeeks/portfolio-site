import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Linkedin, Github, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
	const contactRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const emailRef = useRef<HTMLDivElement>(null);

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

	const copyEmail = () => {
		navigator.clipboard.writeText("meekhoffm@gmail.com");
		if (emailRef.current) {
			gsap.to(emailRef.current, {
				scale: 1.05,
				duration: 0.2,
				yoyo: true,
				repeat: 1,
				ease: "power2.inOut",
			});
		}
	};

	return (
		<section id="contact" ref={contactRef} className="py-24 bg-dark-bg">
			<div className="max-w-4xl mx-auto px-6 text-center">
				<div ref={contentRef}>
					<h2 className="text-4xl md:text-5xl font-bold text-white-soft mb-8">
						Contact Me
					</h2>

					<div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
						<button
							onClick={copyEmail}
							className="flex items-center gap-4 border-2 border-white-soft text-white-soft px-8 py-4 rounded-full hover:bg-white-soft hover:text-dark-bg transition-all duration-300"
						>
							<span
								ref={emailRef}
								className="text-lg font-medium transition-colors duration-300 tracking-wide"
								onClick={copyEmail}
							>
								meekhoffm@gmail.com
							</span>
							<Copy size={16} />
						</button>

						<a
							href="/resume.pdf"
							className="group border-2 border-white-soft text-white-soft px-8 py-4 rounded-full hover:bg-white-soft hover:text-dark-bg transition-all duration-300 flex items-center justify-center space-x-2"
						>
							<span>Download Resume</span>
							<ArrowUpRight
								size={16}
								className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
							/>
						</a>
					</div>

					<div className="flex justify-center space-x-8">
						<a
							href="https://www.linkedin.com/in/maxmeekhoff/"
							target="_blank"
							className="text-gray-medium hover:text-white-soft transition-colors duration-300 flex items-center space-x-2"
						>
							<Linkedin size={24} />
							<span>LinkedIn</span>
						</a>
						<a
							href="https://github.com/maxmeeks"
							target="_blank"
							className="text-gray-medium hover:text-white-soft transition-colors duration-300 flex items-center space-x-2"
						>
							<Github size={24} />
							<span>GitHub</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
