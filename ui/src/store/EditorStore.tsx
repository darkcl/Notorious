import * as React from "react";

export enum EditorActions {
  UPDATE_EDITOR_MODE = "UPDATE_EDITOR_MODE"
}

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface IEditorState {
  isPreview: boolean;
}

const initialState: IEditorState = {
  isPreview: false
};

type Action = { type: EditorActions.UPDATE_EDITOR_MODE; isPreview: boolean };

function reducer(state: IEditorState, action: Action): IEditorState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case EditorActions.UPDATE_EDITOR_MODE:
      return {
        ...state,
        isPreview: action.isPreview
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
