import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CrosshairCursor: React.FC = () => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const topRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = cursorRef.current;
		if (!el) return;

		// Quick setters for cursor position
		const setX = gsap.quickSetter(el, "x", "px");
		const setY = gsap.quickSetter(el, "y", "px");

		const handleMouseMove = (e: MouseEvent) => {
			setX(e.clientX);
			setY(e.clientY);
		};

		const handleMouseDown = () => {
			gsap.to(topRef.current, {
				y: "+=0.2rem",
				duration: 0.15,
				ease: "power2.out",
			});
			gsap.to(bottomRef.current, {
				y: "-=0.2rem",
				duration: 0.15,
				ease: "power2.out",
			});
			gsap.to(leftRef.current, {
				x: "+=0.2rem",
				duration: 0.15,
				ease: "power2.out",
			});
			gsap.to(rightRef.current, {
				x: "-=0.2rem",
				duration: 0.15,
				ease: "power2.out",
			});
		};

		const handleMouseUp = () => {
			gsap.to(topRef.current, {
				y: "-=0.2rem",
				duration: 0.3,
				ease: "elastic.out(1,0.5)",
			});
			gsap.to(bottomRef.current, {
				y: "+=0.2rem",
				duration: 0.3,
				ease: "elastic.out(1,0.5)",
			});
			gsap.to(leftRef.current, {
				x: "-=0.2rem",
				duration: 0.3,
				ease: "elastic.out(1,0.5)",
			});
			gsap.to(rightRef.current, {
				x: "+=0.2rem",
				duration: 0.3,
				ease: "elastic.out(1,0.5)",
			});
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			className=" hidden md:block fixed w-[1.7rem] h-[1.7rem] top-[-0.83rem] left-[-0.83rem] pointer-events-none mix-blend-difference z-[100000] will-change-transform"
		>
			<div
				ref={topRef}
				className="
          absolute left-1/2 top-0
          w-[0.2rem] h-[0.5rem] bg-white
          -translate-x-1/2 translate-y-0
          will-change-transform
        "
			/>

			<div
				ref={bottomRef}
				className="
          absolute left-1/2 bottom-0
          w-[0.2rem] h-[0.5rem] bg-white
          -translate-x-1/2 translate-y-0
          will-change-transform
        "
			/>

			<div
				ref={leftRef}
				className="
          absolute top-1/2 left-0
          w-[0.5rem] h-[0.2rem] bg-white
          translate-x-0 -translate-y-1/2
          will-change-transform
        "
			/>

			<div
				ref={rightRef}
				className="
          absolute top-1/2 right-0
          w-[0.5rem] h-[0.2rem] bg-white
          translate-x-0 -translate-y-1/2
          will-change-transform
        "
			/>
		</div>
	);
};

export default CrosshairCursor;
