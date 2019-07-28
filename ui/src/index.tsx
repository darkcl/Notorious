import * as React from "react";
import * as ReactDOM from "react-dom";

import "./style/index.css";

import App from "./components/App";

declare var external;
declare var folder;

const render = () => ReactDOM.render(<App />, document.getElementById("root"));

// counter.render = render;
folder.render = render;

window.onclick = function(e) {
  const elem = e.target as Element;
  if (elem.localName === "a") {
    e.preventDefault();
    external.invoke("openlink: " + elem.getAttribute("href"));
  }
};

render();
