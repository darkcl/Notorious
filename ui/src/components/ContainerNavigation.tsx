import * as React from "react";
import { Fragment } from "react";
import { HeaderSection, MenuSection, Item } from "@atlaskit/navigation-next";
import { EditorStore } from "../store";
import { EditorActions } from "../store/EditorStore";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

declare var folder;
declare var settings;

export const ContainerNavigation = () => {
  const editorDispatch = React.useContext(EditorStore.Dispatch);

  return (
    <Fragment>
      <HeaderSection>
        {({ className }) => (
          <div className={className}>
            <WorkspaceSwitcher />
          </div>
        )}
      </HeaderSection>
      <MenuSection>
        {({ className }) => (
          <div className={className}>
            {folder.data.folderTree.folders
              .find(
                val => val.name === settings.data.settings.lastOpenWorkspace
              )
              .files.map(val => (
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
