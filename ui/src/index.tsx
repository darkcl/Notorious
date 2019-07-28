import * as React from "react";
import * as ReactDOM from "react-dom";

import "./style/index.css";

import App from "./components/App";

// declare var counter;
declare var folder;

const render = () => ReactDOM.render(<App />, document.getElementById("root"));

// counter.render = render;
folder.render = render;

render();
