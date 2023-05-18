import React from "react";
import { observer } from "mobx-react-lite";
import { HistoryStore } from "../../store";
import s from "./History.module.css";
import { HistoryProp } from "./History.types";
export const History = observer(({ validate }: HistoryProp) => {
	const { history } = HistoryStore;

	return (
		<ul className={s.list}>
			{history.map((elem) => (
				<li
					className={s.itemList}
					key={elem}
					onClick={() => {
						console.log(elem);
						validate(elem);
					}}
				>
					<button className={s.buttonSearch}>{elem}</button>
				</li>
			))}
		</ul>
	);
});
