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
}

const initialState: IEditorState = {
  isPreview: false,
  markdown: null
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
  switch (action.type) {
    case EditorActions.UPDATE_EDITOR_MODE:
      if (action.isPreview && state.markdown !== folder.data.currentContent) {
        folder.save(state.markdown);
      }

      return {
        ...state,
        isPreview: action.isPreview
      };
    case EditorActions.RELOAD_FILE: {
      const settingData = {
        ...settings.data.settings,
        lastOpenFile: folder.data.currentPath.substring(
          folder.data.currentPath.lastIndexOf("/") + 1
        )
      };
      settings.updateSettings(JSON.stringify(settingData));

      return {
        ...state,
        markdown: folder.data.currentContent || null
      };
    }
    case EditorActions.UPDATE_MARKDOWN:
      return {
        ...state,
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
