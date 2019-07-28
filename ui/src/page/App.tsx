import * as React from "react";
import { Fragment } from "react";
import EmojiAtlassianIcon from "@atlaskit/icon/glyph/emoji/atlassian";
import { AtlassianWordmark } from "@atlaskit/logo";
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

const MyProductNavigation = () => (
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
            onClick={() => console.log("click dashboard")}
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

class App extends React.Component {
  render() {
    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={Global}
          productNavigation={MyProductNavigation}
          containerNavigation={null}
        >
          <EditorPage />
        </LayoutManager>
      </NavigationProvider>
    );
  }
}

export default App;
