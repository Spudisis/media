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

		if (res) {
			localStorage.setItem("history", JSON.stringify([value, ...this.history.slice(0, 3)]));
			this.getHistory();
		}
	}
	checkHistory(value: string) {
		const found = this.history.filter((elem) => elem === value);

		if (found.length > 0) {
			const filter = this.history.filter((elem) => elem !== value);

			localStorage.setItem("history", JSON.stringify([value, ...filter]));
			return this.getHistory();
		}
		return true;
	}
}

export const HistoryStore = new History();
