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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
	useEffect(() => {
		gsap.config({ force3D: true });
		ScrollTrigger.refresh();
		return () => {
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
