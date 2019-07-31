import * as React from "react";
import { useReducer, useContext } from "react";
import EmojiAtlassianIcon from "@atlaskit/icon/glyph/emoji/atlassian";
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
import { EditorStore } from "../store";
import { EditorActions } from "../store/EditorStore";
import { NavigationStore } from "../store/NavigationStore";

const AppSwitcherComponent = props => (
  <GlobalItem
    {...props}
    icon={AppSwitcherIcon}
    id="test"
    onClick={() => console.log("AppSwitcher clicked")}
  />
);

const Global = () => (
  <GlobalNavigation
    productIcon={EmojiAtlassianIcon}
    productHref="#"
    onProductClick={() => console.log("product clicked")}
    onCreateClick={() => console.log("create clicked")}
    onSearchClick={() => console.log("search clicked")}
    onStarredClick={() => console.log("starred clicked")}
    onHelpClick={() => console.log("help clicked")}
    helpItems={() => <div />}
    onNotificationClick={() => console.log("notification clicked")}
    appSwitcherComponent={AppSwitcherComponent}
    appSwitcherTooltip="Switch to ..."
    onSettingsClick={() => console.log("settings clicked")}
    loginHref="#login"
  />
);

const App = () => {
  const editorState = React.useContext(EditorStore.State);
  const editorDispatch = React.useContext(EditorStore.Dispatch);

  const navigationState = React.useContext(NavigationStore.State);

  return (
    <Hotkeys
      keyName="ctrl+e"
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
            navigationState.workingDirectory !== "" ? ContainerNavigation : null
          }
        >
          <EditorPage isPreview={editorState.isPreview} />
        </LayoutManager>
      </NavigationProvider>
    </Hotkeys>
  );
};

export default App;
