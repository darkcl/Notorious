import * as React from "react";
import * as ReactDOM from "react-dom";

import "./style/index.css";
import "@atlaskit/css-reset/dist/bundle.css";

import App from "./page/App";
import { Store } from "./store";
import { Modal } from "./components/modal/Modal";
import { FlagGroupComponent } from "./components/flags/FlagGroupComponent";
import { ErrorBoundary } from "./components/error/ErrorBoundry";
import { DrawerComponent } from "./components/drawer/DrawerComponent";
import { IPCRenderer } from "./ipc";

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

window.renderer = new IPCRenderer();

window.onclick = function(e) {
  const elem = e.target as Element;
  if (elem.localName === "a") {
    e.preventDefault();
    window.renderer.send({
      evt: "openlink",
      val: elem.getAttribute("href")
    });
  }
};

render();
