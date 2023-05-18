import { makeAutoObservable } from "mobx";
class Audio {
	constructor() {
		makeAutoObservable(this, {});
	}
	nameAudio = "";
	//сохранение времени при открытии плейера
	durationPrevHear = 0;
	//общее время дл записи, после ухода с плеера
	durationAll = 0;

	calcDuration(sec: number, href: string) {
		if (this.nameAudio === href) return Math.floor((sec - this.durationPrevHear) / 1000);
		return Math.floor(sec / 1000);
	}
	durationString(currentTime: number) {
		const minCalc =
			Math.floor(currentTime / 60) < 10 ? `0${Math.floor(currentTime / 60)}` : Math.floor(currentTime / 60);
		const secCalc =
			Math.floor(currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60);

		return `${minCalc}:${secCalc}`;
	}
	calculatePercentage(number: number, All: number) {
		const percent = (All / number) * 100;
		return percent;
	}
}
export const AudioStore = new Audio();
