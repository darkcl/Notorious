import * as React from "react";
import { Fragment, useReducer, useContext } from "react";
import EmojiAtlassianIcon from "@atlaskit/icon/glyph/emoji/atlassian";
import { AtlassianWordmark } from "@atlaskit/logo";
import Hotkeys from "react-hot-keys";
import {
  GlobalItem,
  GroupHeading,
  LayoutManager,
  HeaderSection,
  MenuSection,
  NavigationProvider,
  Item,
  Separator,
  Wordmark
} from "@atlaskit/navigation-next";
import AppSwitcherIcon from "@atlaskit/icon/glyph/app-switcher";
import GlobalNavigation from "@atlaskit/global-navigation";

import { EditorPage } from "./EditorPage";
import { AppContext } from "../state/AppContext";

const initialState = {
  isPreview: false
};

const UPDATE_EDITOR_MODE = "UPDATE_EDITOR_MODE";

function reducer(state, action) {
  console.log("reducer:", state, action);
  switch (action.type) {
    case UPDATE_EDITOR_MODE:
      return {
        isPreview: action.isPreview
      };
    default:
      return initialState;
  }
}

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

const MyProductNavigation = () => {
  const { appState, dispatch } = React.useContext(AppContext);
  return (
    <Fragment>
      <HeaderSection>
        {({ className }) => (
          <div className={className}>
            <Wordmark wordmark={AtlassianWordmark} />
          </div>
        )}
      </HeaderSection>
      <MenuSection>
        {({ className }) => (
          <div className={className}>
            <Item
              text="Dashboard"
              onClick={() => {
                console.log(`${appState.isPreview}`);
              }}
            />
            <Item text="Things" />
            <Item text="Settings" />
            <Separator />
            <GroupHeading>Add-ons</GroupHeading>
            <Item text="My plugin" />
          </div>
        )}
      </MenuSection>
    </Fragment>
  );
};

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  return (
    <Hotkeys
      keyName="ctrl+e"
      filter={event => {
        return true;
      }}
      onKeyDown={(keyName, e, handle) => {
        e.preventDefault();
        dispatch({
          type: UPDATE_EDITOR_MODE,
          isPreview: !appState.isPreview
        });
      }}
      onKeyUp={(keyName, e, handle) => {}}
    >
      <AppContext.Provider value={{ appState, dispatch }}>
        <NavigationProvider>
          <LayoutManager
            globalNavigation={Global}
            productNavigation={MyProductNavigation}
            containerNavigation={null}
          >
            <EditorPage isPreview={appState.isPreview} />
          </LayoutManager>
        </NavigationProvider>
      </AppContext.Provider>
    </Hotkeys>
  );
};

export default App;
