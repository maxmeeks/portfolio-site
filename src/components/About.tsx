import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import headshotImg from "../assets/headshot.jpeg";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
	const aboutRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);
	const skillBoxesRef = useRef<HTMLDivElement[]>([]);
	const scrollingTextRef = useRef<HTMLSpanElement>(null);

	const skills = [
		"React",
		"Vue",
		"TypeScript",
		"JavaScript",
		"Tailwind CSS",
		"Node.js",
		"Next.js",
		"GSAP",
		"CSS3",
		"HTML5",
		"Git",
		"Figma",
	];

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: contentRef.current,
				start: "top 80%",
			},
		});

		tl.fromTo(
			aboutRef.current,
			{ x: -30, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power3.out",
			}
		);

		tl.fromTo(
			contentRef.current,
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: "power3.out",
			}
		);

		tl.fromTo(
			imageRef.current,
			{ scale: 0.8, opacity: 0 },
			{
				scale: 1,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
			},
			"-=0.5"
		);

		tl.fromTo(
			skillsRef.current,
			{ y: 40, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
			},
			"-=0.3"
		);

		tl.fromTo(
			skillBoxesRef.current,
			{
				y: 30,
				opacity: 0,
				scale: 0.8,
			},
			{
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.6,
				ease: "back.out(1.7)",
				stagger: 0.1,
			},
			"-=0.4"
		);

		skillBoxesRef.current.forEach((box, index) => {
			if (box) {
				gsap.to(box, {
					y: "random(-10, 10)",
					x: "random(-5, 5)",
					rotation: "random(-2, 2)",
					duration: "random(2, 4)",
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: index * 0.1,
				});
			}
		});

		if (scrollingTextRef.current) {
			gsap.set(scrollingTextRef.current, { x: "0%" });

			gsap.to(scrollingTextRef.current, {
				x: "-50%",
				duration: 8, // Changed from 20 to 8 for much faster scrolling
				ease: "none",
				repeat: -1,
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	const addToRefs = (el: HTMLDivElement | null) => {
		if (el && !skillBoxesRef.current.includes(el)) {
			skillBoxesRef.current.push(el);
		}
	};

	return (
		<section id="about" className="py-24 border-y border-white/30 relative">
			<div
				ref={aboutRef}
				className="absolute top-0 left-0 p-6 text-base font-mono text-white/80"
			>
				02 // ABOUT
			</div>

			<div className="mx-auto px-6 max-w-4xl">
				<div ref={contentRef}>
					<h2 className="text-4xl md:text-5xl font-bold text-white-soft mb-16 text-center">
						About Me
					</h2>

					<div className="flex flex-col items-center gap-12">
						<div className="relative">
							<img
								ref={imageRef}
								src={headshotImg}
								alt="Max Meekhoff"
								className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
							/>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
						</div>

						<div className="text-center max-w-2xl">
							<p className="text-xl text-white/80 leading-relaxed mb-8">
								Hello! My name is Max, and I'm a creative
								developer with over 7 years of experience
								building digital products and commercial web
								applications.
							</p>
							<p className="text-xl text-white/80 leading-relaxed">
								My approach combines technical expertise with
								creative vision to deliver solutions that not
								only function flawlessly but also provide
								exceptional user experiences. I specialize in
								modern web technologies, collaborative team
								work, and interactive design.
							</p>
						</div>

						<div className="w-full max-w-3xl">
							<h3 className="text-2xl font-bold text-white-soft mb-8 text-center">
								Skills & Technologies
							</h3>

							<div
								ref={skillsRef}
								className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
							>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{skills.map((skill) => (
										<div
											key={skill}
											ref={addToRefs}
											className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-center hover:bg-white/20 transition-colors duration-300 cursor-default"
										>
											<span className="text-white/90 font-medium text-sm">
												{skill}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full overflow-hidden mt-16">
				<div className="whitespace-nowrap">
					<span
						ref={scrollingTextRef}
						className="inline-block text-6xl md:text-9xl font-bold text-white/80 tracking-wider"
					>
						Max Meekhoff - Max Meekhoff - Max Meekhoff - Max
						Meekhoff - Max Meekhoff - Max Meekhoff -
					</span>
				</div>
			</div>
		</section>
	);
};

export default About;
