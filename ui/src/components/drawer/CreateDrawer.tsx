import * as React from "react";
import BoardIcon from "@atlaskit/icon/glyph/board";
import FileIcon from "@atlaskit/icon/glyph/file";
import IssuesIcon from "@atlaskit/icon/glyph/issues";

import { DrawerItemGroup, DrawerItem } from "@atlaskit/drawer";
import { DrawerStore, DrawerActions } from "../../store/DrawerStore";

const commonProps = () => {
  const drawerDispatch = React.useContext(DrawerStore.Dispatch);
  return {
    onClick: () => {
      console.log("item on click");
      drawerDispatch({ type: DrawerActions.DISMISS });
    },
    onKeyDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    title: "HTML title attribute"
  };
};

export const CreateDrawer: React.FunctionComponent = () => {
  const drawerDispatch = React.useContext(DrawerStore.Dispatch);
  return (
    <React.Fragment>
      <DrawerItemGroup title="Workspace">
        <DrawerItem
          onClick={() => drawerDispatch({ type: DrawerActions.DISMISS })}
          elemBefore={(<BoardIcon label="Board icon" /> as unknown) as Node}
        >
          Create Workspace
        </DrawerItem>
        <DrawerItem
          {...commonProps}
          elemBefore={(<FileIcon label="File icon" /> as unknown) as Node}
        >
          Create Notes
        </DrawerItem>
      </DrawerItemGroup>
      <DrawerItemGroup title="JIRA">
        <DrawerItem
          {...commonProps}
          elemBefore={(<IssuesIcon label="Issue icon" /> as unknown) as Node}
        >
          Track Issue
        </DrawerItem>
      </DrawerItemGroup>
    </React.Fragment>
  );
};
