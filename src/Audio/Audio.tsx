import React from "react";
import { TypesAuto } from "./Audio.types";
import s from "./Audio.module.css";
import pauseImg from "./assets/Play.svg";
import playImg from "./assets/Pause.svg";

export const Audio = ({ href, setStatusAudio, setErrStatus }: TypesAuto) => {
	const itemRef = React.useRef<HTMLAudioElement>(null);
	const [statusLoading, setStatusLoading] = React.useState(true);
	const [volume, setVolume] = React.useState(0.5);
	const [currentTime, setCurrentTime] = React.useState(0);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [durationTime, setDurationTime] = React.useState("00:00");
	const [statusNetwork, setStatusNetwork] = React.useState(0);
	React.useEffect(() => {
		if (itemRef.current) itemRef.current.volume = volume;
	}, [volume]);

	React.useEffect(() => {
		const min = Math.floor(currentTime / 60) < 10 ? `0${Math.floor(currentTime / 60)}` : Math.floor(currentTime / 60);
		const sec = Math.floor(currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60);
		setDurationTime(`${min}:${sec}`);
	}, [currentTime]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const nowCurrentTime = Math.floor(itemRef.current?.currentTime || 0);
			setStatusNetwork(itemRef.current?.networkState || 1);
			setCurrentTime(nowCurrentTime);
		}, 100);
		if (itemRef.current) {
			if (isPlaying) {
				itemRef.current.play();
			}
			if (!isPlaying) itemRef.current.pause();
		}
		return () => clearInterval(interval);
	}, [isPlaying]);

	const playAudio = () => {
		if (itemRef.current) {
			setIsPlaying(!isPlaying);
		}
	};

	const changeVolume = (e: string) => {
		if (itemRef.current) {
			const levelVolume = Number(e);
			setVolume(levelVolume);
		}
	};

	const changeDuration = (e: string) => {
		if (itemRef.current) {
			const currentTime = Number(e);
			setCurrentTime(currentTime);

			itemRef.current.currentTime = currentTime;
		}
	};
	const calculatePercentage = (number: number, All: number) => {
		const percent = (All / number) * 100;
		return percent;
	};

	return (
		<div className={s.wrapper}>
			<button className={s.back} onClick={() => setStatusAudio(false)}>
				← Back
			</button>
			<div className={s.player}>
				{(statusLoading || statusNetwork === 2) && <div className={s.loader}></div>}
				<audio
					src={href}
					ref={itemRef}
					onError={() => {
						setErrStatus(true);
						setStatusAudio(false);
					}}
					onEnded={() => {
						setIsPlaying(false);
						setCurrentTime(itemRef.current?.duration || currentTime);
					}}
					onLoadedData={() => {
						setStatusLoading(false);
					}}
				></audio>
				<button className={s.playStop} onClick={() => playAudio()} disabled={statusLoading}>
					<img src={isPlaying ? playImg : pauseImg} alt={isPlaying ? "play" : "pause"} />
				</button>
				<input
					className={s.changeCurrentTime}
					type="range"
					min={0}
					max={itemRef.current ? (itemRef.current?.duration === Infinity ? 1 : itemRef.current?.duration) : 1}
					value={itemRef.current?.duration === Infinity ? 1 : currentTime}
					disabled={statusLoading || itemRef.current?.duration === Infinity}
					step={0.01}
					onChange={(e) => changeDuration(e.target.value)}
					style={{
						background: `linear-gradient(to right, white 0%, white ${
							itemRef.current ? calculatePercentage(itemRef.current.duration, currentTime) : 0
						}%, #ADACAD ${
							itemRef.current ? calculatePercentage(itemRef.current.duration, currentTime) : 0
						}%, #ADACAD 100%)`,
					}}
				/>
				<div className={s.paramsAudio}>
					<span>{durationTime}</span>
					<input
						className={s.changeVolume}
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={volume}
						style={{
							background: `linear-gradient(to right, black 0%, black ${volume * 100}%, #fff ${
								volume * 100
							}%, #fff 100%)`,
						}}
						onChange={(e) => changeVolume(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};
