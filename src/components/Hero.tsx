import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import SlicedText from "./SlicedText";

const Hero: React.FC = () => {
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	// keep a ref to the hover tween so we can kill it on mouseleave
	const hoverTween = useRef<GSAPTween | null>(null);

	useEffect(() => {
		const tl = gsap.timeline({ delay: 0.3 });

		// Animate subtitle in on page load
		tl.fromTo(
			subtitleRef.current,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
			"-=0.4"
		);

		// Animate button in
		tl.fromTo(
			buttonRef.current,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
			"-=0.4"
		);
	}, []);

	// on hover of the button, float the subtitle
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
		// kill the infinite tween
		hoverTween.current?.kill();
		hoverTween.current = null;
		// return subtitle back to zero
		if (subtitleRef.current) {
			gsap.to(subtitleRef.current, {
				y: 0,
				duration: 0.3,
				ease: "power1.out",
			});
		}
	};

	const scollToAbout = () => {
		const workSection = document.getElementById("about");
		workSection?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="min-h-screen bg-dark-bg flex items-center justify-center px-6 pt-20">
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
					onClick={scollToAbout}
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
