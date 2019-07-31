import * as React from "react";
import { Fragment } from "react";
import { AtlassianWordmark } from "@atlaskit/logo";
import BacklogIcon from "@atlaskit/icon/glyph/backlog";
import BoardIcon from "@atlaskit/icon/glyph/board";
import GraphLineIcon from "@atlaskit/icon/glyph/graph-line";
import ShortcutIcon from "@atlaskit/icon/glyph/shortcut";
import {
  GroupHeading,
  HeaderSection,
  MenuSection,
  Item,
  Separator,
  ContainerHeader,
  ItemAvatar,
  Wordmark
} from "@atlaskit/navigation-next";
import { gridSize as gridSizeFn } from "@atlaskit/theme";
import InlineDialog from "@atlaskit/inline-dialog";
import { NavigationStore, NavigationActions } from "../store/NavigationStore";

export const ContainerNavigation = () => {
  const navigationDispatcher = React.useContext(NavigationStore.Dispatch);
  const gridSize = gridSizeFn();
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
                navigationDispatcher({
                  type: NavigationActions.UPDATE_WORKING_DIR,
                  workingDirectory: ""
                });
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
