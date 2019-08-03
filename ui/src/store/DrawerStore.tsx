import * as React from "react";

export enum DrawerActions {
  SHOW = "SHOW",
  DISMISS = "DISMISS"
}

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface IDrawerState {
  isHidden: boolean;
}

const initialState: IDrawerState = {
  isHidden: true
};

type DrawerAction =
  | { type: DrawerActions.SHOW }
  | { type: DrawerActions.DISMISS };

function reducer(state: IDrawerState, action: DrawerAction): IDrawerState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case DrawerActions.SHOW:
      return {
        ...state,
        isHidden: false
      };
    case DrawerActions.DISMISS:
      return {
        ...state,
        isHidden: true
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
export const DrawerStore = {
  State,
  Dispatch,
  Provider
};
