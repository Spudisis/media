import { makeAutoObservable } from "mobx";

class History {
	constructor() {
		makeAutoObservable(this, {});
	}
	history = [];
	private openHistory = false;

	get modalStatusHistory() {
		return this.openHistory;
	}
	set modalStatusHistory(value) {
		this.openHistory = value;
	}

	getHistory() {
		const mas = localStorage.getItem("history");
		if (mas) {
			this.history = JSON.parse(mas);
		}
	}
	setHistory(value: string) {
		const res = this.checkHistory(value);
		console.log(res);
		if (res) {
			console.log(value, this.history);
			localStorage.setItem("history", JSON.stringify([value, ...this.history.slice(0, 3)]));
			this.getHistory();
		}
	}
	checkHistory(value: string) {
		const found = this.history.filter((elem) => elem === value);
		console.log(found);
		if (found.length > 0) {
			return false;
		}
		return true;
	}
}

export const HistoryStore = new History();
