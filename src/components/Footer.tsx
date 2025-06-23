import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-dark-surface text-white-soft py-12 border-t border-dark-border">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-6 md:mb-0 font-bold">MAX M.</div>

					<div className="text-center md:text-left">
						<p className="text-white-soft font-bold">
							© 2025 Max Meekhoff.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
