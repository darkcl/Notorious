import * as React from "react";
import Hotkeys from "react-hot-keys";
import {
  GlobalItem,
  LayoutManager,
  NavigationProvider
} from "@atlaskit/navigation-next";
import AppSwitcherIcon from "@atlaskit/icon/glyph/app-switcher";
import GlobalNavigation from "@atlaskit/global-navigation";

import { EditorPage } from "./EditorPage";
import { ProductNavigation } from "../components/ProductNavigation";
import { ContainerNavigation } from "../components/ContainerNavigation";
import { EditorStore, ModalStore } from "../store";
import { EditorActions } from "../store/EditorStore";
import { EmptyPage } from "../components/EmptyPage";
import { ModalActions } from "../store/ModalStore";
import { DrawerStore, DrawerActions } from "../store/DrawerStore";

import { AppIcon } from "../components/AppIcon";

declare var folder;

const AppSwitcherComponent = props => (
  <GlobalItem
    {...props}
    icon={AppSwitcherIcon}
    id="test"
    onClick={() => console.log("AppSwitcher clicked")}
  />
);

const Global: React.FunctionComponent = () => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  const drawerDispatch = React.useContext(DrawerStore.Dispatch);

  return (
    <GlobalNavigation
      productIcon={AppIcon}
      productTooltip="Notorious"
      onProductClick={() => console.log("product clicked")}
      onCreateClick={() => drawerDispatch({ type: DrawerActions.SHOW })}
      onSettingsClick={() => {
        console.log("settings clicked");
        modalDispatch({ type: ModalActions.SHOW_SETTINGS_MODAL });
      }}
    />
  );
};

const App = () => {
  const editorState = React.useContext(EditorStore.State);
  const editorDispatch = React.useContext(EditorStore.Dispatch);
  const modalDispatch = React.useContext(ModalStore.Dispatch);

  return (
    <Hotkeys
      keyName="ctrl+e,command+e,ctrl+n,command+n,escape"
      filter={event => {
        return true;
      }}
      onKeyDown={(keyName, e, handle) => {
        e.preventDefault();

        if (keyName === "ctrl+e" || keyName == "command+e") {
          editorDispatch({
            type: EditorActions.UPDATE_EDITOR_MODE,
            isPreview: !editorState.isPreview
          });
          return;
        }

        if (keyName === "ctrl+n" || keyName == "command+n") {
          modalDispatch({
            type: ModalActions.SHOW_FILE_MODAL
          });
          return;
        }
      }}
      onKeyUp={(keyName, e, handle) => {}}
    >
      <NavigationProvider>
        <LayoutManager
          globalNavigation={Global}
          productNavigation={ProductNavigation}
          containerNavigation={ContainerNavigation}
        >
          {editorState.markdown !== null ? <EditorPage /> : <EmptyPage />}
        </LayoutManager>
      </NavigationProvider>
    </Hotkeys>
  );
};

export default App;
