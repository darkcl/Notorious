import * as React from "react";
import { Fragment } from "react";
import { AtlassianWordmark } from "@atlaskit/logo";
import {
  GroupHeading,
  HeaderSection,
  MenuSection,
  Item,
  Separator,
  Wordmark
} from "@atlaskit/navigation-next";
import { NavigationStore, NavigationActions } from "../store/NavigationStore";

declare var folder;

export const ProductNavigation = () => {
  const navigationDispatcher = React.useContext(NavigationStore.Dispatch);
  console.log(folder);
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
                  type: NavigationActions.UPDATE_WORKSPACE,
                  workingDirectory: "testing"
                });
              }}
            />
            <Item text="Read Folder" />
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
