import React from "react";

import s from "./Player.module.css";
import pauseImg from "../../assets/Play.svg";
import playImg from "../../assets/Pause.svg";

import { AudioStore } from "../../store";
import { observer } from "mobx-react";
import { PlayerType } from "./Player.types";

export const Player = observer(
	({ href, setStatusAudio, setErrStatus, isPlaying, setIsPlaying, numberPlayer, setCodeErr }: PlayerType) => {
		const itemRef = React.useRef<HTMLAudioElement>(null);
		const [statusLoading, setStatusLoading] = React.useState(true);
		const [volume, setVolume] = React.useState(0.1);
		const [currentTime, setCurrentTime] = React.useState(0);
		const [durationTime, setDurationTime] = React.useState("00:00");
		const [statusNetwork, setStatusNetwork] = React.useState(0);
		const [infinityDuration, setInfinityDuration] = React.useState(0);
		const [readyToPlay, setReadyToPlay] = React.useState(false);

		const refInput = React.useRef(false);

		React.useEffect(() => {
			const ref = itemRef.current;
			return () => {
				if (ref) {
					if (ref.duration === Infinity) {
						AudioStore.nameAudio = href;
					}
					AudioStore.durationPrevHear = AudioStore.durationAll;
					ref.src = "";
				}
			};
		}, []);

		React.useEffect(() => {
			const keyDown = (e: KeyboardEvent) => {
				if (e.key === "ArrowRight" && refInput.current) {
					changeDuration(String(currentTime + 1));
				}
			};
			document.addEventListener("keydown", keyDown);
			return () => {
				document.removeEventListener("keydown", keyDown);
			};
		}, [currentTime]);

		React.useEffect(() => {
			if (itemRef.current) itemRef.current.volume = volume;
		}, [volume]);

		React.useEffect(() => {
			calcDurationString(currentTime);
		}, [currentTime, infinityDuration]);

		React.useEffect(() => {
			const interval = setInterval(() => {
				const nowCurrentTime = Math.floor(itemRef.current?.currentTime || 0);
				setStatusNetwork(itemRef.current?.networkState || 1);
				setCurrentTime(nowCurrentTime);
			}, 100);
			const ref = itemRef.current;
			if (ref) {
				ref.addEventListener("progress", checkTimeStamp);

				if (isPlaying) ref.play();
				if (!isPlaying) ref.pause();
			}
			return () => {
				clearInterval(interval);
				if (ref) {
					ref.removeEventListener("progress", checkTimeStamp);
				}
			};
		}, [isPlaying]);

		const checkTimeStamp = (e: ProgressEvent<EventTarget>) => {
			const sec = AudioStore.calcDuration(e.timeStamp, href);
			AudioStore.durationAll = e.timeStamp;

			setInfinityDuration(sec - 1);
		};

		const calcDurationString = (currentTime: number) => {
			const time = AudioStore.durationString(currentTime);
			setDurationTime(time);
		};

		const playAudio = () => {
			if (readyToPlay) {
				if (AudioStore.playerNumber !== numberPlayer) {
					AudioStore.playerNumber = numberPlayer;
				}
				setIsPlaying(!isPlaying);
			}
		};

		const changeVolume = (e: string) => {
			const levelVolume = Number(e);
			setVolume(levelVolume);
		};

		const changeDuration = (e: string) => {
			if (itemRef.current) {
				const currentTime = Number(e);
				setCurrentTime(currentTime);

				itemRef.current.currentTime = currentTime;
			}
		};

		return (
			<div className={s.player}>
				{(statusLoading || statusNetwork === 2) && <div className={s.loader}></div>}
				<audio
					src={href}
					ref={itemRef}
					onError={() => {
						setCodeErr(400);
						setErrStatus(true);
						setStatusAudio(false);
					}}
					onEnded={() => {
						setIsPlaying(false);
						setCurrentTime(itemRef.current?.duration || currentTime);
					}}
					onLoadedData={() => {
						setReadyToPlay(true);
						setStatusLoading(false);
					}}
					onWaiting={() => {
						setStatusLoading(true);
					}}
				></audio>
				<button className={s.playStop} onClick={() => playAudio()} tabIndex={2}>
					<img src={isPlaying ? playImg : pauseImg} alt={isPlaying ? "play" : "pause"} />
				</button>
				<input
					tabIndex={3}
					className={s.changeCurrentTime}
					type="range"
					min={0}
					onFocus={() => (refInput.current = true)}
					onBlur={() => (refInput.current = false)}
					max={
						itemRef.current
							? itemRef.current?.duration === Infinity
								? infinityDuration
								: itemRef.current?.duration || 1
							: 1
					}
					value={currentTime}
					step={0.01}
					onChange={(e) => changeDuration(e.target.value)}
					style={{
						background: `linear-gradient(to right, white 0%, white ${
							itemRef.current ? AudioStore.calculatePercentage(itemRef.current.duration, currentTime) : 0
						}%, #ADACAD ${
							itemRef.current ? AudioStore.calculatePercentage(itemRef.current.duration, currentTime) : 0
						}%, #ADACAD 100%)`,
					}}
				/>
				<div className={s.paramsAudio}>
					<span>{durationTime}</span>
					<input
						tabIndex={4}
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
		);
	}
);
