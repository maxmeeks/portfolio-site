import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import snowmanPoolImg from "../assets/snowman-golf.png";
import portfolioSite from "../assets/portfolio-site.png";

// Import client logos as SVG files
import alamoLogo from "../assets/logos/alamo.svg";
import aosmithLogo from "../assets/logos/aosmith.svg";
import centralBankLogo from "../assets/logos/centralbank.svg";
import chefsLogo from "../assets/logos/chefs.svg";
import jrLogo from "../assets/logos/jr.svg";
import modernwoodmenLogo from "../assets/logos/modernwoodmen.svg";
import moodyLogo from "../assets/logos/moody.svg";

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

interface Client {
	id: number;
	name: string;
	logo: string;
	url?: string;
	description: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "Snowman Golf Pools",
		description: "Vue fantasy golf application with live ESPN leaderboard",
		tags: ["Vue", "Vite", "ESPN API", "Pinia"],
		image: snowmanPoolImg,
		liveUrl: "https://snowman-golf-pools.vercel.app/",
		githubUrl: "https://github.com/maxmeeks/golf-pool",
	},
	{
		id: 2,
		title: "maxmeekhoff.com",
		description: "Personal Portfolio site",
		tags: ["React", "Vite", "Typescript", "Vercel", "GSAP"],
		image: portfolioSite,
		liveUrl: "https://maxmeekhoff.com",
	},
];

const clients: Client[] = [
	{
		id: 1,
		name: "Alamo Colleges",
		logo: alamoLogo,
		url: "https://www.alamo.edu/",
		description: "Alamo",
	},
	{
		id: 2,
		name: "AO Smith",
		logo: aosmithLogo,
		url: "https://www.aosmith.com/",
		description: "AO Smith",
	},
	{
		id: 3,
		name: "Central Bank",
		logo: centralBankLogo,
		url: "https://www.centralbank.net/",
		description: "Central Bank",
	},
	{
		id: 4,
		name: "Chefs Warehouse",
		logo: chefsLogo,
		url: "https://www.chefswarehouse.com/",
		description: "Chefs Warehouse",
	},
	{
		id: 5,
		name: "JR Automation",
		logo: jrLogo,
		url: "https://www.jrautomation.com/",
		description: "JR Automation",
	},
	{
		id: 6,
		name: "Modern Woodmen",
		logo: modernwoodmenLogo,
		url: "https://www.modernwoodmen.org",
		description: "Modern Woodmen",
	},
	{
		id: 7,
		name: "Moody Bible Institute",
		logo: moodyLogo,
		url: "https://www.moodybible.org/",
		description: "Moody Bible Institute",
	},
];

const Work: React.FC = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const sectionLabelRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);
	const clientsTitleRef = useRef<HTMLHeadingElement>(null);
	const clientLogosRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 80%",
			},
		});

		tl.fromTo(
			sectionLabelRef.current,
			{ x: -30, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power3.out",
			}
		);

		tl.fromTo(
			titleRef.current,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
			},
			"-=0.3"
		);

		tl.fromTo(
			cardsRef.current,
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.2,
				ease: "power3.out",
			},
			"-=0.4"
		);

		tl.fromTo(
			clientsTitleRef.current,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power3.out",
			},
			"-=0.2"
		);

		tl.fromTo(
			clientLogosRef.current,
			{ y: 30, opacity: 0, scale: 0.9 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.6,
				stagger: 0.1,
				ease: "back.out(1.7)",
			},
			"-=0.3"
		);

		// Cleanup
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	const addToRefs = (el: HTMLDivElement | null) => {
		if (el && !cardsRef.current.includes(el)) {
			cardsRef.current.push(el);
		}
	};

	const addToClientRefs = (el: HTMLDivElement | null) => {
		if (el && !clientLogosRef.current.includes(el)) {
			clientLogosRef.current.push(el);
		}
	};

	return (
		<section
			id="work"
			ref={sectionRef}
			className="relative py-24 bg-dark-bg border-y border-white/30"
		>
			<div
				ref={sectionLabelRef}
				className="absolute top-0 left-0 p-6 text-base font-mono text-white/80"
			>
				03 // WORK
			</div>

			<div className="max-w-7xl mx-auto px-6">
				<h2
					ref={titleRef}
					className="text-4xl md:text-5xl font-bold text-white-soft mb-16 text-center"
				>
					Recent Projects
				</h2>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
					{projects.map((project) => (
						<div
							key={project.id}
							ref={addToRefs}
							className="group cursor-pointer overflow-hidden"
						>
							<div className="relative h-96 overflow-hidden border border-dark-border">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>

								<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								<div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									{project.liveUrl && (
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
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
											target="_blank"
											rel="noopener noreferrer"
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
								<div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
									<div className="bg-black/70 p-4 rounded-md max-w-full">
										<h3 className="text-2xl font-medium text-white-soft mb-2">
											{project.title}
										</h3>
										<p className="text-gray-light mb-4">
											{project.description}
										</p>
										<div className="flex flex-wrap justify-center gap-2">
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

				<div className="border-t border-white/20 pt-16">
					<h3
						ref={clientsTitleRef}
						className="text-2xl md:text-3xl font-bold text-white-soft mb-12 text-center"
					>
						Find some of my work
					</h3>

					<div className="flex flex-wrap lg:flex-nowrap justify-center gap-8">
						{clients.map((client) => (
							<div
								key={client.id}
								ref={addToClientRefs}
								className="group"
							>
								<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
									{client.url ? (
										<a
											href={client.url}
											target="_blank"
											rel="noopener noreferrer"
											className="p-6 h-24 w-full flex items-center justify-center"
											title={client.description}
										>
											<img
												src={client.logo}
												alt={client.name}
												className="max-w-full max-h-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
											/>
										</a>
									) : (
										<div
											className="w-full h-full flex items-center justify-center"
											title={client.description}
										>
											<img
												src={client.logo}
												alt={client.name}
												className="max-w-full max-h-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
											/>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Work;
