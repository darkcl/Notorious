import * as React from "react";
import { useReducer, useContext } from "react";
import Icon from "@atlaskit/icon";
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
import { NavigationStore } from "../store/NavigationStore";
import { EmptyPage } from "../components/EmptyPage";
import { ModalActions } from "../store/ModalStore";
import { FlagStore, FlagActions } from "../store/FlagStore";
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
  const flagDispatch = React.useContext(FlagStore.Dispatch);

  return (
    <GlobalNavigation
      productIcon={AppIcon}
      productHref="#"
      onProductClick={() => console.log("product clicked")}
      onCreateClick={() => drawerDispatch({ type: DrawerActions.SHOW })}
      onSearchClick={() => {
        console.log("search click");
        flagDispatch({
          type: FlagActions.SHOW_MESSAGE,
          message: "testing"
        });
      }}
      onStarredClick={() => {
        console.log("starred clicked");
      }}
      onHelpClick={() => console.log("help clicked")}
      helpItems={() => <div />}
      onNotificationClick={() => console.log("notification clicked")}
      appSwitcherComponent={AppSwitcherComponent}
      appSwitcherTooltip="Switch to ..."
      onSettingsClick={() => {
        console.log("settings clicked");
        modalDispatch({ type: ModalActions.SHOW_SETTINGS_MODAL });
      }}
      loginHref="#login"
    />
  );
};

const App = () => {
  const editorState = React.useContext(EditorStore.State);
  const editorDispatch = React.useContext(EditorStore.Dispatch);

  return (
    <Hotkeys
      keyName="ctrl+e,command+e"
      filter={event => {
        return true;
      }}
      onKeyDown={(keyName, e, handle) => {
        e.preventDefault();
        editorDispatch({
          type: EditorActions.UPDATE_EDITOR_MODE,
          isPreview: !editorState.isPreview
        });
      }}
      onKeyUp={(keyName, e, handle) => {}}
    >
      <NavigationProvider>
        <LayoutManager
          globalNavigation={Global}
          productNavigation={ProductNavigation}
          containerNavigation={
            folder.data.folderTree !== undefined &&
            folder.data.folderTree !== null
              ? ContainerNavigation
              : null
          }
        >
          {editorState.markdown !== null ? <EditorPage /> : <EmptyPage />}
        </LayoutManager>
      </NavigationProvider>
    </Hotkeys>
  );
};

export default App;
