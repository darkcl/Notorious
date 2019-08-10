import * as React from "react";
import ChevD from "@atlaskit/icon/glyph/chevron-down";
import {
  ContainerHeader,
  ItemAvatar,
  Switcher
} from "@atlaskit/navigation-next";
import { ModalStore, ModalActions } from "../../../store/ModalStore";
import { EditorStore } from "../../../store";
import { EditorActions } from "../../../store/EditorStore";

declare var folder;
declare var settings;

export const WorkspaceSwitcher: React.FunctionComponent = () => {
  const editorDispatch = React.useContext(EditorStore.Dispatch);
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  const capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getWorkspace = f => {
    return f.folders.map(val => {
      return {
        avatar: null,
        id: val.name,
        text: capitalize(val.name),
        subText: `${val.files.length} note(s)`,
        pathname: val.path
      };
    });
  };
  const getCurrentWorkspace = f => {
    return f.folders
      .map(val => {
        return {
          avatar: null,
          id: val.name,
          text: capitalize(val.name),
          subText: `${val.files.length} note(s)`,
          pathname: val.path
        };
      })
      .find(val => val.id === settings.data.settings.lastOpenWorkspace);
  };
  const create = () => ({
    onClick: () => {
      modalDispatch({
        type: ModalActions.SHOW_WORKSPACE_MODAL
      });
    },
    text: "Create Workspace"
  });
  const target = obj => {
    const { id, subText, text } = obj;
    return (
      <ContainerHeader
        before={state => {
          return (
            <ItemAvatar
              appearance="square"
              href={null}
              isInteractive={false}
              itemState={state}
              onClick={null}
            />
          );
        }}
        after={ChevD}
        id={id}
        subText={subText}
        text={text}
      />
    );
  };
  const onChange = selected => {
    console.log(selected);

    folder.openWorkspace(selected.id);

    let lastOpenFile = "";

    if (
      folder.data.currentPath !== undefined &&
      folder.data.currentPath.length > 0
    ) {
      lastOpenFile = folder.data.currentPath.substring(
        folder.data.currentPath.lastIndexOf("/") + 1
      );
    }

    // Update Settings
    const settingData = {
      ...settings.data.settings,
      lastOpenFile,
      lastOpenWorkspace: selected.id
    };
    settings.updateSettings(JSON.stringify(settingData));

    setTimeout(() => {
      editorDispatch({
        type: EditorActions.RELOAD_FILE
      });
    }, 100);
  };
  return (
    <Switcher
      create={create()}
      onChange={onChange}
      options={getWorkspace(folder.data.folderTree)}
      target={target(getCurrentWorkspace(folder.data.folderTree))}
      value={getCurrentWorkspace(folder.data.folderTree)}
    />
  );
};
