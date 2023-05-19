import React from "react";

import s from "./Audio.module.css";

import { observer } from "mobx-react";
import { TypesAuto } from "./Audio.types";
import { Player } from "./components";
import { AudioStore } from "./store";

export const Audio = observer(({ href, setStatusAudio, setErrStatus }: TypesAuto) => {
	const [isPlaying, setIsPlaying] = React.useState(false);
	const mas = ["first", "second"];
	return (
		<div className={s.wrapper}>
			<button className={s.back} onClick={() => setStatusAudio(false)} tabIndex={1}>
				← Back
			</button>
			<>
				{mas.map((_, index) => (
					<Player
						href={href}
						setStatusAudio={setStatusAudio}
						setErrStatus={setErrStatus}
						setIsPlaying={setIsPlaying}
						numberPlayer={index}
						isPlaying={isPlaying && AudioStore.playerNumber === index}
					/>
				))}
			</>
		</div>
	);
});
