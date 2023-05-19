import { TypesAuto } from "../../Audio.types";

export type PlayerType = {
	setIsPlaying: (b: boolean) => void;
	isPlaying: boolean;
    numberPlayer: number;
} & TypesAuto;
