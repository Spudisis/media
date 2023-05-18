import React from "react";

import App from "./App";
import { Details } from "./Details";
import { render } from "react-dom";

render(<App />, document.getElementById("root") as HTMLElement);
render(<Details />, document.getElementById("details") as HTMLElement);
