import * as React from "react";
import Drawer from "@atlaskit/drawer";
import { DrawerStore, DrawerActions } from "../../store/DrawerStore";
import { CreateDrawer } from "./CreateDrawer";

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
      <CreateDrawer />
    </Drawer>
  );
};
