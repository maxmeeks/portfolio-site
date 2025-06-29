import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const InteractiveBorder: React.FC = () => {
	const borderRef = useRef<HTMLDivElement>(null);
	const mouse = useRef({ x: 0, y: 0 });
	const isNearBorder = useRef(false);

	useEffect(() => {
		const borderElement = borderRef.current;
		if (!borderElement) return;

		// Get all section borders
		const sections = document.querySelectorAll('section[id]');
		const borders: { element: Element; rect: DOMRect; type: 'top' | 'bottom' }[] = [];

		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			borders.push(
				{ element: section, rect, type: 'top' },
				{ element: section, rect, type: 'bottom' }
			);
		});

		const updateBorderPosition = () => {
			let closestBorder: { distance: number; x: number; y: number; width: number } | null = null;
			let minDistance = Infinity;

			borders.forEach(({ rect, type }) => {
				const borderY = type === 'top' ? rect.top + window.scrollY : rect.bottom + window.scrollY;
				const distance = Math.abs(mouse.current.y + window.scrollY - borderY);
				
				// Check if mouse is within horizontal bounds and close vertically
				if (
					mouse.current.x >= rect.left && 
					mouse.current.x <= rect.right && 
					distance < 100 && 
					distance < minDistance
				) {
					minDistance = distance;
					closestBorder = {
						distance,
						x: rect.left,
						y: borderY,
						width: rect.width
					};
				}
			});

			if (closestBorder && minDistance < 50) {
				if (!isNearBorder.current) {
					isNearBorder.current = true;
					gsap.to(borderElement, {
						opacity: 1,
						scale: 1,
						duration: 0.3,
						ease: "power2.out"
					});
				}

				// Calculate the glow position along the border
				const glowX = mouse.current.x - closestBorder.x;
				const glowWidth = Math.min(200, closestBorder.width * 0.3);
				
				gsap.set(borderElement, {
					x: closestBorder.x,
					y: closestBorder.y - window.scrollY,
					width: closestBorder.width,
				});

				// Update the glow position
				const glowElement = borderElement.querySelector('.border-glow') as HTMLElement;
				if (glowElement) {
					gsap.set(glowElement, {
						x: Math.max(0, Math.min(glowX - glowWidth / 2, closestBorder.width - glowWidth)),
						width: glowWidth,
					});
				}
			} else {
				if (isNearBorder.current) {
					isNearBorder.current = false;
					gsap.to(borderElement, {
						opacity: 0,
						scale: 0.8,
						duration: 0.3,
						ease: "power2.out"
					});
				}
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouse.current.x = e.clientX;
			mouse.current.y = e.clientY;
			updateBorderPosition();
		};

		const handleScroll = () => {
			updateBorderPosition();
		};

		// Initial setup
		gsap.set(borderElement, {
			opacity: 0,
			scale: 0.8,
			transformOrigin: "center center"
		});

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
			className="fixed pointer-events-none z-30 h-[1px]"
			style={{ top: 0, left: 0 }}
		>
			{/* Base border */}
			<div className="absolute inset-0 bg-white/20" />
			
			{/* Animated glow */}
			<div className="border-glow absolute top-0 h-full">
				<div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-light/40 to-transparent blur-sm" />
			</div>
		</div>
	);
};

export default InteractiveBorder;