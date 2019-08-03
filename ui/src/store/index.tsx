import * as React from "react";
import { cloneElement } from "react";
import { EditorStore } from "./EditorStore";
import { NavigationStore } from "./NavigationStore";
import { ModalStore } from "./ModalStore";
import { FlagStore } from "./FlagStore";
import { DrawerStore } from "./DrawerStore";

const providers = [
  <EditorStore.Provider />,
  <NavigationStore.Provider />,
  <ModalStore.Provider />,
  <FlagStore.Provider />,
  <DrawerStore.Provider />
];

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  );

export { Store, EditorStore, ModalStore };
