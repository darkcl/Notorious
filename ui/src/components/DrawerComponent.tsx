import * as React from "react";
import Drawer from "@atlaskit/drawer";
import { DrawerStore, DrawerActions } from "../store/DrawerStore";

export const DrawerComponent: React.FunctionComponent = () => {
  const drawerState = React.useContext(DrawerStore.State);
  const drawerDispatch = React.useContext(DrawerStore.Dispatch);

  const onClose = () => {
    drawerDispatch({ type: DrawerActions.DISMISS });
  };

  const onCloseComplete = () => {};

  return (
    <Drawer
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isOpen={!drawerState.isHidden}
      width="wide"
    >
      <h1>Some Drawer</h1>
    </Drawer>
  );
};
