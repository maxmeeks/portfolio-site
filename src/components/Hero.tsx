import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import SlicedText from "./SlicedText";

const Hero: React.FC = () => {
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const scrollIndicatorRef = useRef<HTMLDivElement>(null);
	const hoverTween = useRef<GSAPTween | null>(null);

	useEffect(() => {
		const tl = gsap.timeline({ delay: 0.3 });

		tl.fromTo(
			subtitleRef.current,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
			"-=0.4"
		);

		tl.fromTo(
			buttonRef.current,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
			"-=0.4"
		);

		tl.fromTo(
			scrollIndicatorRef.current,
			{ x: -30, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
			"-=0.6"
		);
	}, []);

	const handleButtonEnter = () => {
		if (!subtitleRef.current) return;
		hoverTween.current = gsap.to(subtitleRef.current, {
			y: -5,
			duration: 1.5,
			ease: "power1.inOut",
			yoyo: true,
			repeat: -1,
		});
	};

	const handleButtonLeave = () => {
		hoverTween.current?.kill();
		hoverTween.current = null;
		if (subtitleRef.current) {
			gsap.to(subtitleRef.current, {
				y: 0,
				duration: 0.3,
				ease: "power1.out",
			});
		}
	};

	const scrollToAbout = () => {
		const aboutSection = document.getElementById("about");
		aboutSection?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="min-h-screen bg-dark-bg flex items-center justify-center px-6 pt-20 relative">
			<div
				ref={scrollIndicatorRef}
				className="absolute top-1/4 left-6 z-40"
			>
				<div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 group">
					<span className="text-base font-mono tracking-wider">
						01 // Scroll
					</span>
					<ArrowDown
						size={16}
						className="group-hover:translate-y-1 transition-transform duration-300"
					/>
				</div>
			</div>

			<div className="mx-auto text-center">
				<SlicedText text="Max Meekhoff" numSlices={8} />

				<p
					ref={subtitleRef}
					className="text-lg md:text-xl text-white/80 my-10 max-w-2xl mx-auto leading-relaxed"
				>
					Creative developer focused on crafting exceptional digital
					experiences that make a lasting impact.
				</p>

				<button
					ref={buttonRef}
					onClick={scrollToAbout}
					onMouseEnter={handleButtonEnter}
					onMouseLeave={handleButtonLeave}
					className="group font-bold bg-white-soft text-dark-bg px-10 py-5 rounded-full hover:bg-gray-light transition-all duration-300 flex items-center space-x-3 mx-auto text-lg shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-105"
				>
					<span>About Me</span>
					<ArrowDown
						size={20}
						className="group-hover:translate-y-1 transition-transform duration-300"
					/>
				</button>
			</div>
		</section>
	);
};

export default Hero;
