import * as React from "react";

export enum NavigationActions {
  UPDATE_WORKING_DIR = "UPDATE_WORKING_DIR"
}

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface INavigationState {
  workingDirectory: string;
}

const initialState: INavigationState = {
  workingDirectory: ""
};

type NavigationAction = {
  type: NavigationActions.UPDATE_WORKING_DIR;
  workingDirectory: string;
};

function reducer(
  state: INavigationState,
  action: NavigationAction
): INavigationState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case NavigationActions.UPDATE_WORKING_DIR:
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
