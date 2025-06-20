import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type SlicedTextProps = {
	text: string;
	numSlices?: number;
};

const SlicedText: React.FC<SlicedTextProps> = ({ text, numSlices = 8 }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sliceHeight, setSliceHeight] = useState(0);
	const hasAnimatedIn = useRef(false);

	// 1) measure <h1> height on mount + on window resize
	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const h1 = container.querySelector<HTMLHeadingElement>("h1")!;
		const measure = () => {
			const { height } = h1.getBoundingClientRect();
			setSliceHeight(height / numSlices);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [text, numSlices]);

	// 2) entrance animation: fire once when sliceHeight becomes non-zero
	useLayoutEffect(() => {
		if (!sliceHeight || hasAnimatedIn.current) return;
		hasAnimatedIn.current = true;

		const slices =
			containerRef.current!.querySelectorAll<HTMLElement>(".slice");
		gsap.set(slices, { x: "-200vw" });
		gsap.to(slices, {
			duration: 1,
			x: 0,
			ease: "power4.out",
			stagger: { amount: 0.5, from: "random" },
		});
	}, [sliceHeight]);

	// hover handlers (if you still want them)
	const handleSliceEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		gsap.to(e.currentTarget, {
			backgroundColor: "#00ff88",
			duration: 0.3,
			scaleX: 1.1,
			zIndex: 2,
		});
	};
	const handleSliceLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		gsap.to(e.currentTarget, {
			backgroundColor: "#ffffff",
			duration: 0.3,
			scaleX: 1,
			zIndex: 1,
		});
	};

	return (
		<div
			ref={containerRef}
			className="relative inline-block overflow-hidden"
			style={{
				height: sliceHeight ? `${sliceHeight * numSlices}px` : "auto",
			}}
		>
			{/* Invisible in‐flow H1 so we measure & get correct width */}
			<h1 className="invisible whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-bold">
				{text}
			</h1>

			{/* Slices */}
			{sliceHeight > 0 &&
				Array.from({ length: numSlices }).map((_, i) => (
					<div
						key={i}
						className="slice absolute left-0 w-full overflow-hidden bg-white"
						style={{
							top: `${i * sliceHeight}px`,
							height: `${sliceHeight}px`,
						}}
						onMouseEnter={handleSliceEnter}
						onMouseLeave={handleSliceLeave}
					>
						<div
							className="slice-text absolute left-0 whitespace-nowrap 
                         text-6xl md:text-8xl lg:text-9xl font-bold"
							style={{
								top: `-${i * sliceHeight}px`,
								left: 0,
								color: "#000",
							}}
						>
							{text}
						</div>
					</div>
				))}
		</div>
	);
};

export default SlicedText;
