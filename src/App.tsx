import React from "react";

import { Form } from "./Form";
import { Audio } from "./Audio";
function App() {
	const [errStatus, setErrStatus] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [statusAudio, setStatusAudio] = React.useState(false);

	React.useEffect(() => {
		setErrStatus(false);
	}, [value]);

	return (
		<>
			{!statusAudio ? (
				<Form
					setStatusAudio={setStatusAudio}
					value={value}
					setValue={setValue}
					setErrStatus={setErrStatus}
					errStatus={errStatus}
				/>
			) : (
				<Audio setStatusAudio={setStatusAudio} href={value} setErrStatus={setErrStatus} />
			)}
		</>
	);
}

export default App;
