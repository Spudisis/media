import React from "react";

import { Sections } from "./details.types";
import s from "./details.module.scss";
export const Details = () => {
	const [section, setSection] = React.useState(Sections["Own server"]);
	const chooseSection = (section: Sections) => {
		setSection(section);
	};

	const changeStyle = (sectionProp: Sections) => {
		return section === sectionProp ? "details_button details_active" : "details_button details_inactive";
	};

	return (
		<article className="requirements">
			<h3 className="requirements_header">Technical requrements</h3>
			<div>
				<div className="details">
					<div className="details_wrapperButtons">
						<button
							onClick={() => chooseSection(Sections["Own server"])}
							className={changeStyle(Sections["Own server"])}
						>
							Own server
						</button>
						<button
							onClick={() => chooseSection(Sections["Amazon Instance"])}
							className={changeStyle(Sections["Amazon Instance"])}
						>
							Amazon Instance
						</button>
					</div>
					{section === Sections["Own server"] ? (
						<ul className="details_content">
							<li className="details_item">
								<span>OS + apps</span>
								<span>Unix/OSX + docker + nvidia-docker</span>
							</li>
							<li className="details_item">
								<span>CPU</span>
								<span>4 cores or more (e.g. intel core i5)</span>
							</li>
							<li className="details_item">
								<span>Memory</span>
								<span>16 GB RAM</span>
							</li>
							<li className="details_item">
								<span>Free space</span>
								<span>100 GB of free space</span>
							</li>
							<li className="details_item">
								<span>Graphics hardware</span>
								<span>GPU: NVidia only 2Gb+</span>
							</li>
						</ul>
					) : section === Sections["Amazon Instance"] ? (
						<div>
							<ul className="details_content">
								<li className="details_item">
									<span>Instance</span>
									<span>g4dn.xlarge</span>
								</li>
								<li className="details_item">
									<span>GPU</span>
									<span>1</span>
								</li>
								<li className="details_item">
									<span>vCPUs</span>
									<span>4</span>
								</li>
								<li className="details_item">
									<span>Memory</span>
									<span>16 GB RAM</span>
								</li>
								<li className="details_item">
									<span>Storage</span>
									<span>125 GB</span>
								</li>
							</ul>
						</div>
					) : (
						<div>How did you do this?</div>
					)}
				</div>
			</div>
		</article>
	);
};
