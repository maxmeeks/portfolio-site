import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import snowmanPoolImg from "../assets/snowman-golf.png";
gsap.registerPlugin(ScrollTrigger);

interface Project {
	id: number;
	title: string;
	description: string;
	tags: string[];
	image: string;
	liveUrl?: string;
	githubUrl?: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "Snowman Golf Pools",
		description: "Vue fantasy golf application with live ESPN leaderboard",
		tags: ["Vue", "Node.js", "API", "Vercel"],
		image: snowmanPoolImg,
		liveUrl: "https://snowman-golf-pools.vercel.app/",
		githubUrl: "https://github.com/maxmeeks/golf-pool",
	},
	{
		id: 2,
		title: "Fantasy Golf Dynasty",
		description:
			"Comprehensive design system and component library for a fintech startup, ensuring consistency across all platforms.",
		tags: ["Figma", "React", "Storybook", "TypeScript"],
		image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
		liveUrl: "https://example.com",
	},
];

const Work: React.FC = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		// Title fade‐in
		gsap.fromTo(
			titleRef.current,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top 80%",
				},
			}
		);
		// Cards stagger fade‐in
		cardsRef.current.forEach((card, i) => {
			if (!card) return;
			gsap.fromTo(
				card,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					delay: i * 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						start: "top 85%",
					},
				}
			);
		});
	}, []);

	const addToRefs = (el: HTMLDivElement | null) => {
		if (el && !cardsRef.current.includes(el)) {
			cardsRef.current.push(el);
		}
	};

	return (
		<section
			id="work"
			className="relative py-24 bg-dark-bg border-y border-white"
		>
			{/* 03 // WORK label */}
			<div className="absolute top-0 left-0 p-6 text-sm font-mono text-white/70">
				03 // WORK
			</div>

			<div className="max-w-7xl mx-auto px-6">
				<h2
					ref={titleRef}
					className="text-4xl md:text-5xl font-light text-white-soft mb-16 text-center"
				>
					Recent Projects
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{projects.map((project) => (
						<div
							key={project.id}
							ref={addToRefs}
							className="group cursor-pointer overflow-hidden"
						>
							{/* Image container */}
							<div className="relative h-96 overflow-hidden border border-dark-border">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								{/* dimming overlay on hover */}
								<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								{/* action icons */}
								<div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									{project.liveUrl && (
										<a
											href={project.liveUrl}
											onClick={(e) => e.stopPropagation()}
											className="bg-dark-surface p-2 rounded-full hover:bg-dark-border transition-colors"
										>
											<ExternalLink
												size={16}
												className="text-white-soft"
											/>
										</a>
									)}
									{project.githubUrl && (
										<a
											href={project.githubUrl}
											onClick={(e) => e.stopPropagation()}
											className="bg-dark-surface p-2 rounded-full hover:bg-dark-border transition-colors"
										>
											<Github
												size={16}
												className="text-white-soft"
											/>
										</a>
									)}
								</div>
								{/* text overlay */}
								<div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
									<div className="bg-black/70 p-4 rounded-md max-w-full">
										<h3 className="text-2xl font-medium text-white-soft mb-2">
											{project.title}
										</h3>
										<p className="text-gray-light mb-4">
											{project.description}
										</p>
										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="text-sm bg-dark-surface text-gray-light px-3 py-1 rounded-full border border-dark-border"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Work;
