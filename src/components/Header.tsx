import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Copy, FileText, Linkedin, Github } from "lucide-react";

interface HeaderProps {
	lenis?: any;
}

const Header: React.FC<HeaderProps> = ({ lenis }) => {
	const headerRef = useRef<HTMLDivElement>(null);
	const lastScrollY = useRef(0);
	const isHidden = useRef(false);

	useEffect(() => {
		const tl = gsap.timeline();
		tl.fromTo(
			headerRef.current,
			{ y: -50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
		);

		const handleScroll = (e: any) => {
			const currentScrollY =
				e?.scroll || window.scrollY || window.pageYOffset;

			if (currentScrollY <= 50) {
				if (isHidden.current) {
					gsap.to(headerRef.current, {
						y: 0,
						duration: 0.3,
						ease: "power2.out",
					});
					isHidden.current = false;
				}
			} else {
				const scrollingDown = currentScrollY > lastScrollY.current;
				const scrollingUp = currentScrollY < lastScrollY.current;

				if (scrollingUp && isHidden.current) {
					gsap.to(headerRef.current, {
						y: 0,
						duration: 0.3,
						ease: "power2.out",
					});
					isHidden.current = false;
				} else if (scrollingDown && !isHidden.current) {
					gsap.to(headerRef.current, {
						y: -100,
						duration: 0.3,
						ease: "power2.out",
					});
					isHidden.current = true;
				}
			}

			lastScrollY.current = currentScrollY;
		};

		if (lenis) {
			lenis.on("scroll", handleScroll);
		} else {
			window.addEventListener("scroll", handleScroll, { passive: true });
		}

		return () => {
			if (lenis) {
				lenis.off("scroll", handleScroll);
			} else {
				window.removeEventListener("scroll", handleScroll);
			}
		};
	}, [lenis]);

	return (
		<header
			ref={headerRef}
			className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-white/30"
		>
			<div className="max-w-7xl mx-auto px-6 py-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-6 font-bold">
						Max M.
					</div>

					<nav className="flex items-center space-x-10">
						<a
							href="#about"
							className="text-base text-white-soft hover:text-gray-light transition-colors duration-300 font-bold tracking-wide"
						>
							About
						</a>
						<a
							href="#work"
							className="text-base text-white-soft hover:text-gray-light transition-colors duration-300 font-bold tracking-wide"
						>
							Projects
						</a>
						<a
							href="#contact"
							className="text-base text-white-soft hover:text-gray-light transition-colors duration-300 font-bold tracking-wide"
						>
							Contact
						</a>
					</nav>

					<div className="flex items-center space-x-5">
						<a
							href="https://www.linkedin.com/in/maxmeekhoff/"
							className="text-gray-medium hover:text-white-soft transition-colors duration-300"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin size={18} />
						</a>
						<a
							href="https://github.com/maxmeeks"
							className="text-gray-medium hover:text-white-soft transition-colors duration-300"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github size={18} />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
