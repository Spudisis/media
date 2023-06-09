import React from "react";

import s from "./Audio.module.css";

import { observer } from "mobx-react";
import { TypesAuto } from "./Audio.types";
import { Player } from "./components";
import { AudioStore } from "./store";

export const Audio = observer(({ href, setStatusAudio, setErrStatus, setCodeErr }: TypesAuto) => {
	const [isPlaying, setIsPlaying] = React.useState(false);
	const mas = ["first", "second"];
	return (
		<div className={s.root}>
			<div className={s.wrapper}>
				<button className={s.back} onClick={() => setStatusAudio(false)} tabIndex={1}>
					← Back
				</button>
				<div className={s.grid}>
					{mas.map((_, index) => (
						<Player
							key={_}
							href={href}
							setStatusAudio={setStatusAudio}
							setErrStatus={setErrStatus}
							setIsPlaying={setIsPlaying}
							numberPlayer={index}
							setCodeErr={setCodeErr}
							isPlaying={isPlaying && AudioStore.playerNumber === index}
						/>
					))}
				</div>
			</div>
		</div>
	);
});
