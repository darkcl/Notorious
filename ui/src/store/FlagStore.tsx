import * as React from "react";

export enum FlagActions {
  SHOW_MESSAGE = "SHOW_MESSAGE",
  SHOW_WARNING = "SHOW_WARNING",
  DISMISS = "DISMISS"
}

export enum FlagType {
  None = -1,
  Message = 0,
  Warning = 1
}

export interface FlagData {
  created: number;
  description: string;
  id: number;
  key: number;
  title: string;
  type: string;
}

const State = React.createContext(null);
const Dispatch = React.createContext(null);

export interface IFlagState {
  flagCount: number;
  flags: FlagData[];
}

const initialState: IFlagState = {
  flags: [],
  flagCount: 0
};

type FlagAction =
  | { type: FlagActions.SHOW_MESSAGE; message: string }
  | { type: FlagActions.SHOW_WARNING; message: string }
  | { type: FlagActions.DISMISS };

const getFlagData = (
  index: number,
  description: string,
  timeOffset: number = 0,
  flagTitle: string = "Message",
  flagType: string = "info"
): FlagData => {
  return {
    created: Date.now() - timeOffset * 1000,
    description,
    id: index,
    key: index,
    title: flagTitle,
    type: flagType
  };
};

function reducer(state: IFlagState, action: FlagAction): IFlagState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case FlagActions.SHOW_MESSAGE: {
      const flags = state.flags.slice();
      flags.unshift(getFlagData(state.flagCount++, action.message));
      return {
        ...state,
        flags: flags,
        flagCount: flags.length
      };
    }
    case FlagActions.SHOW_WARNING: {
      const flags = state.flags.slice();
      flags.unshift(
        getFlagData(state.flagCount++, action.message, 0, "Warning", "warning")
      );
      return {
        ...state,
        flags: flags,
        flagCount: flags.length
      };
    }
    case FlagActions.DISMISS: {
      const flags = state.flags.slice(1);
      return {
        ...state,
        flags: flags,
        flagCount: flags.length
      };
    }
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
export const FlagStore = {
  State,
  Dispatch,
  Provider
};
