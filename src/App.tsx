import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedGrid from "./components/AnimatedGrid";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CrosshairCursor from "./components/CrosshairCursor";
import Lenis from "lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
	useEffect(() => {
		// 1) Initialize Lenis with v1 options
		const lenis = new Lenis({
			duration: 1.2, // overall scroll duration
			easing: (
				t: number // custom easing fn
			) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			lerp: 0.1, // smoothing (0 < lerp < 1)
			orientation: "vertical", // scroll direction
			gestureOrientation: "vertical", // touch gesture direction
			smoothWheel: true, // enable wheel smoothing
		});

		// 2) Drive Lenis + keep ScrollTrigger in sync
		const raf = (time: number) => {
			lenis.raf(time);
			ScrollTrigger.update();
			requestAnimationFrame(raf);
		};
		requestAnimationFrame(raf);

		// 3) Clean up
		return () => {
			lenis.destroy();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<div className="relative">
			<CrosshairCursor />
			<div className="bg-dark-bg text-white-soft font-sans overflow-x-hidden relative">
				<AnimatedGrid />
				<div className="relative z-20">
					<Header />
					<main>
						<Hero />
						<About />
						<Work />
						<Contact />
					</main>
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default App;
