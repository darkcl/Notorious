import * as React from "react";

export enum EditorActions {
  UPDATE_EDITOR_MODE = "UPDATE_EDITOR_MODE",
  RELOAD_FILE = "RELOAD_FILE",
  UPDATE_MARKDOWN = "UPDATE_MARKDOWN"
}

declare var folder;
declare var settings;

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface IEditorState {
  isPreview: boolean;
  markdown: string;
  currentWorkspace: string;
  currentFile: string;
}

const initialState: IEditorState = {
  isPreview: false,
  markdown: null,
  currentWorkspace: settings.data.settings.lastOpenWorkspace,
  currentFile: settings.data.settings.lastOpenFile
};

type Action =
  | {
      type: EditorActions.UPDATE_EDITOR_MODE;
      isPreview: boolean;
      currentPath: string;
    }
  | { type: EditorActions.RELOAD_FILE }
  | { type: EditorActions.UPDATE_MARKDOWN; markdown: string };

function reducer(state: IEditorState, action: Action): IEditorState {
  console.log("reducer:", state, action);
  const goState = {
    ...state,
    currentWorkspace: settings.data.settings.lastOpenWorkspace,
    currentFile: settings.data.settings.lastOpenFile
  };
  switch (action.type) {
    case EditorActions.UPDATE_EDITOR_MODE:
      if (action.isPreview && state.markdown !== folder.data.currentContent) {
        folder.save(state.markdown);
      }

      return {
        ...goState,
        isPreview: action.isPreview
      };
    case EditorActions.RELOAD_FILE:
      return {
        ...goState,
        markdown: folder.data.currentContent || null
      };
    case EditorActions.UPDATE_MARKDOWN:
      return {
        ...goState,
        markdown: action.markdown
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
export const EditorStore = {
  State,
  Dispatch,
  Provider
};
