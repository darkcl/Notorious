import * as React from "react";
import * as ReactDOM from "react-dom";

import "./style/index.css";
import "@atlaskit/css-reset/dist/bundle.css";

import App from "./page/App";
import { Store } from "./store";
import { Modal } from "./components/modal/Modal";
import { FlagGroupComponent } from "./components/FlagGroupComponent";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { DrawerComponent } from "./components/drawer/DrawerComponent";

declare var external;
declare var folder;
declare var settings;

const render = () =>
  ReactDOM.render(
    <Store>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <Modal />
      <FlagGroupComponent />
      <DrawerComponent />
    </Store>,
    document.getElementById("root")
  );

folder.render = render;
settings.render = render;

window.onclick = function(e) {
  const elem = e.target as Element;
  if (elem.localName === "a") {
    e.preventDefault();
    external.invoke("openlink: " + elem.getAttribute("href"));
  }
};

render();
