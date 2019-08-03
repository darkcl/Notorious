import * as React from "react";
import StarLargeIcon from "@atlaskit/icon/glyph/star-large";
import BoardIcon from "@atlaskit/icon/glyph/board";

import { DrawerItemGroup, DrawerItem } from "@atlaskit/drawer";

const commonProps = {
  onClick: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  title: "HTML title attribute"
};

export const CreateDrawer: React.FunctionComponent = () => (
  <React.Fragment>
    <DrawerItemGroup title="Lots of Items" isCompact>
      <DrawerItem
        {...commonProps}
        href="#link-to-nowhere"
        target="_blank"
        autoFocus
      >
        Anchor link that opens in a new tab
      </DrawerItem>
      <DrawerItem {...commonProps} description="Here be description">
        Item with description
      </DrawerItem>
      <DrawerItem
        {...commonProps}
        elemAfter={<StarLargeIcon label="Star Icon" />}
      >
        Item with elemAfter
      </DrawerItem>
      <DrawerItem
        {...commonProps}
        elemBefore={(<BoardIcon label="Board icon" /> as unknown) as Node}
      >
        Item with elemBefore
      </DrawerItem>
      <DrawerItem {...commonProps} isCompact>
        Item isCompact
      </DrawerItem>
      <DrawerItem {...commonProps} isDisabled>
        Item isDisabled
      </DrawerItem>
      <DrawerItem {...commonProps} isSelected>
        Item isSelected
      </DrawerItem>
      <DrawerItem {...commonProps} isHidden>
        Item isHidden
      </DrawerItem>
    </DrawerItemGroup>
  </React.Fragment>
);
