import * as React from "react";

import { IFile, IFolder } from "../interface/IFolder";

export enum NavigationActions {
  UPDATE_WORKSPACE = "UPDATE_WORKSPACE"
}

declare var settings;
declare var folder;

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface INavigationState {
  workingDirectory: IFolder;
  currentWorkspace: IWorkspace;
  workspaces: IWorkspace[];
}

interface IWorkspace {
  avatar: string;
  id: string;
  pathname: string;
  text: string;
  subText: string;
}

const getWorkspace = (f: IFolder): IWorkspace[] => {
  if (f.folders !== undefined) {
    return f.folders.map(val => {
      return {
        avatar: null,
        id: val.name,
        text: val.name,
        subText: `Number of notes: ${val.files.length}`,
        pathname: val.path
      } as IWorkspace;
    });
  } else {
    return [];
  }
};

const getCurrentWorkspace = (f: IFolder): IWorkspace => {
  if (f.folders !== undefined) {
    return f.folders
      .map(val => {
        return {
          avatar: null,
          id: val.name,
          text: val.name,
          subText: `Number of notes: ${val.files.length}`,
          pathname: val.path
        } as IWorkspace;
      })
      .find(val => val.text === settings.data.settings.lastOpenWorkspace);
  } else {
    return null;
  }
};

const initialState: INavigationState = {
  workingDirectory: folder.data.folderTree.folders,
  currentWorkspace: getCurrentWorkspace(folder.data.folderTree.folders),
  workspaces: getWorkspace(folder.data.folderTree.folders)
};

type NavigationAction = {
  type: NavigationActions.UPDATE_WORKSPACE;
  workingDirectory: IFolder;
};

function reducer(
  state: INavigationState,
  action: NavigationAction
): INavigationState {
  console.log("reducer:", state, action);
  const goState = {
    ...state
  };
  switch (action.type) {
    case NavigationActions.UPDATE_WORKSPACE:
      return {
        ...state,
        workingDirectory: action.workingDirectory
      };
    default:
      return initialState;
  }
}

// Provider
const Provider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  );
};

// Export
export const NavigationStore = {
  State,
  Dispatch,
  Provider
};
