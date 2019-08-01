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
import { EditorStore } from "../store";
import { EditorActions } from "../store/EditorStore";
import Spinner from "@atlaskit/spinner";

declare var folder;

export const ContainerNavigation = () => {
  const editorDispatch = React.useContext(EditorStore.Dispatch);
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
            {folder.data.folderTree.files.map(val => (
              <Item
                text={val.name}
                onClick={() => {
                  folder.open(val.path);
                  setTimeout(() => {
                    editorDispatch({
                      type: EditorActions.RELOAD_FILE
                    });
                  }, 100);
                }}
              />
            ))}
          </div>
        )}
      </MenuSection>
    </Fragment>
  );
};
