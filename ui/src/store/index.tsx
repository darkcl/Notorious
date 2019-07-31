import * as React from "react";
import { cloneElement } from "react";
import { EditorStore } from "./EditorStore";
import { NavigationStore } from "./NavigationStore";

const providers = [<EditorStore.Provider />, <NavigationStore.Provider />];

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  );

export { Store, EditorStore };
