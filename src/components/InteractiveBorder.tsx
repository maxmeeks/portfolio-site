import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const InteractiveBorder: React.FC = () => {
	const borderRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const mouse = useRef({ x: 0, y: 0 });
	const isActive = useRef(false);

	useEffect(() => {
		const borderElement = borderRef.current;
		const glowElement = glowRef.current;
		if (!borderElement || !glowElement) return;

		// Initialize hidden
		gsap.set(borderElement, { opacity: 0 });

		const checkBorderProximity = () => {
			// Get all sections with borders
			const sections = document.querySelectorAll('section');
			let nearestBorder: {
				y: number;
				left: number;
				width: number;
				distance: number;
			} | null = null;
			let minDistance = Infinity;

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				
				// Check top border
				const topDistance = Math.abs(mouse.current.y - rect.top);
				if (
					mouse.current.x >= rect.left && 
					mouse.current.x <= rect.right && 
					topDistance < 80
				) {
					if (topDistance < minDistance) {
						minDistance = topDistance;
						nearestBorder = {
							y: rect.top,
							left: rect.left,
							width: rect.width,
							distance: topDistance
						};
					}
				}

				// Check bottom border
				const bottomDistance = Math.abs(mouse.current.y - rect.bottom);
				if (
					mouse.current.x >= rect.left && 
					mouse.current.x <= rect.right && 
					bottomDistance < 80
				) {
					if (bottomDistance < minDistance) {
						minDistance = bottomDistance;
						nearestBorder = {
							y: rect.bottom,
							left: rect.left,
							width: rect.width,
							distance: bottomDistance
						};
					}
				}
			});

			if (nearestBorder && minDistance < 50) {
				// Show and position the border
				if (!isActive.current) {
					isActive.current = true;
					gsap.to(borderElement, {
						opacity: 1,
						duration: 0.2,
						ease: "power2.out"
					});
				}

				// Position the border line
				gsap.set(borderElement, {
					left: nearestBorder.left,
					top: nearestBorder.y,
					width: nearestBorder.width,
				});

				// Position the glow effect
				const relativeX = mouse.current.x - nearestBorder.left;
				const glowWidth = 200;
				const glowX = Math.max(0, Math.min(relativeX - glowWidth / 2, nearestBorder.width - glowWidth));
				
				gsap.set(glowElement, {
					left: glowX,
					width: glowWidth,
				});

			} else {
				// Hide the border
				if (isActive.current) {
					isActive.current = false;
					gsap.to(borderElement, {
						opacity: 0,
						duration: 0.2,
						ease: "power2.out"
					});
				}
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouse.current.x = e.clientX;
			mouse.current.y = e.clientY;
			checkBorderProximity();
		};

		const handleScroll = () => {
			if (isActive.current) {
				checkBorderProximity();
			}
		};

		document.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			ref={borderRef}
			className="fixed pointer-events-none z-40 h-[2px]"
			style={{ 
				top: 0, 
				left: 0,
				transformOrigin: 'left center'
			}}
		>
			{/* Base border line */}
			<div className="absolute inset-0 bg-white/30 shadow-sm" />
			
			{/* Moving glow effect */}
			<div
				ref={glowRef}
				className="absolute top-0 h-full"
				style={{ width: 200 }}
			>
				{/* Bright center glow */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
				
				{/* Colored accent glow */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-light/60 to-transparent blur-[1px]" />
				
				{/* Outer soft glow */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-light/30 to-transparent blur-[3px] scale-y-[3]" />
			</div>
		</div>
	);
};

export default InteractiveBorder;