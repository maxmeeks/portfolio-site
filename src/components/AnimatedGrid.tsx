import React, { useEffect, useRef, useState } from "react";

const AnimatedGrid: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState({ w: 0, h: 0 });
	const mouse = useRef({ x: -9999, y: -9999 });

	// keep canvas sized to viewport
	useEffect(() => {
		const onResize = () => {
			setSize({ w: window.innerWidth, h: window.innerHeight });
		};
		onResize();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	// track mouse
	useEffect(() => {
		const onMouse = (e: MouseEvent) => {
			mouse.current.x = e.clientX;
			mouse.current.y = e.clientY;
		};
		const onLeave = () => {
			mouse.current.x = mouse.current.y = -9999;
		};
		document.addEventListener("mousemove", onMouse);
		document.addEventListener("mouseleave", onLeave);
		return () => {
			document.removeEventListener("mousemove", onMouse);
			document.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	// the draw loop
	useEffect(() => {
		let raf: number;
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;

		const spacing = 50;
		const maxD = 150;

		const draw = () => {
			ctx.clearRect(0, 0, size.w, size.h);

			// draw all lines at base opacity
			ctx.strokeStyle = "rgba(255,255,255,0.01)";
			ctx.lineWidth = 1;
			ctx.filter = "none";
			ctx.beginPath();
			for (let x = 0; x <= size.w; x += spacing) {
				ctx.moveTo(x, 0);
				ctx.lineTo(x, size.h);
			}
			for (let y = 0; y <= size.h; y += spacing) {
				ctx.moveTo(0, y);
				ctx.lineTo(size.w, y);
			}
			ctx.stroke();

			// draw “glow” on nearby lines
			const mx = mouse.current.x;
			const my = mouse.current.y;
			if (mx >= 0 && my >= 0) {
				for (let x = 0; x <= size.w; x += spacing) {
					const d = Math.abs(mx - x);
					if (d < maxD) {
						const t = 1 - d / maxD;
						ctx.strokeStyle = `rgba(255,255,255,${0.02 + t * 0.1})`;
						ctx.lineWidth = 1;
						ctx.filter = `blur(${Math.max(0, 2 - t * 2)}px)`;
						ctx.beginPath();
						ctx.moveTo(x, 0);
						ctx.lineTo(x, size.h);
						ctx.stroke();
					}
				}
				for (let y = 0; y <= size.h; y += spacing) {
					const d = Math.abs(my - y);
					if (d < maxD) {
						const t = 1 - d / maxD;
						ctx.strokeStyle = `rgba(255,255,255,${0.03 + t * 0.1})`;
						ctx.lineWidth = 1;
						ctx.filter = `blur(${Math.max(0, 2 - t * 2)}px)`;
						ctx.beginPath();
						ctx.moveTo(0, y);
						ctx.lineTo(size.w, y);
						ctx.stroke();
					}
				}
			}

			raf = requestAnimationFrame(draw);
		};

		draw();
		return () => cancelAnimationFrame(raf);
	}, [size]);

	return (
		<canvas
			ref={canvasRef}
			width={size.w}
			height={size.h}
			className="fixed inset-0 pointer-events-none z-40"
		/>
	);
};

export default AnimatedGrid;
