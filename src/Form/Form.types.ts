export type FormType = {
	setStatusAudio: (b: boolean) => void;
	value: string;
	setValue: (s: string) => void;
	setErrStatus: (b: boolean) => void;
	errStatus: boolean;
	codeErr: number;
	setCodeErr: (n: number) => void;
};
