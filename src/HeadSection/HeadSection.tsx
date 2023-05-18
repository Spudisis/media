import React from "react";
import { HeadType } from "./HeadSection.types";
import s from "./HeadSection.module.css";
export const HeadSection = ({ text }: HeadType) => {
	return <h4 className={s.head}>{text}</h4>;
};
