import React, { ChangeEvent } from "react";
import s from "./Form.module.css";
import errorImage from "./assets/errorImage.svg";
import Union from "./assets/Union.svg";
import { FormType } from "./Form.types";
import { HeadSection } from "../HeadSection";
import { HistoryStore } from "./store";
import { History } from "./components";
import { observer } from "mobx-react";

export const Form = observer(({ setStatusAudio, value, setValue, errStatus, setErrStatus }: FormType) => {
	const { history } = HistoryStore;
	const searchWrapperRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		HistoryStore.getHistory();
	}, []);

	React.useEffect(() => {
		const onClickModal = (e: globalThis.MouseEvent) => {
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
				return (HistoryStore.modalStatusHistory = false);
			}
			return null;
		};
		document.addEventListener("click", (e) => onClickModal(e));

		return () => {
			document.removeEventListener("click", (e) => onClickModal(e));
		};
	}, []);

	const validate = (value: string) => {
		console.log(value);
		const RegExp =
			/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

		if (RegExp.test(value)) {
			HistoryStore.setHistory(value);
			setValue(value);
			return setStatusAudio(true);
		}
		return setErrStatus(true);
	};

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		validate(value);
	};

	return (
		<div className={s.wrapper}>
			<HeadSection text={"Insert the link"} />
			<form className={s.Form} onSubmit={onSubmit}>
				<div className={s.searchWrapper} ref={searchWrapperRef}>
					<input
						className={s.input}
						placeholder="https://"
						value={value}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
						type="text"
						style={{ border: errStatus ? "1px solid #C6A827" : "0px" }}
						onFocus={() => {
							HistoryStore.modalStatusHistory = true;
						}}
					/>
					{HistoryStore.modalStatusHistory && history.length > 0 && <History validate={validate} />}
				</div>
				<button className={s.button} aria-label="Send href">
					<img src={Union} alt="arrow right" />
				</button>

				{errStatus && <img className={s.errorImage} src={errorImage} alt="error" />}
			</form>

			{errStatus && (
				<div className={s.error} aria-errormessage="Error">
					Error message here
				</div>
			)}
		</div>
	);
});
