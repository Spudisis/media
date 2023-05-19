import React from "react";

import App from "./App";
import { Details } from "./Details";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

const containerDet = document.getElementById("details");
const rootDet = createRoot(containerDet!);
rootDet.render(<Details />);
