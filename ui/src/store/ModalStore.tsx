import * as React from "react";

export enum ModalActions {
  SHOW_FILE_MODAL = "SHOW_FILE_MODAL",
  DISMISS = "DISMISS"
}

export enum ModalType {
  None = -1,
  File = 0,
}

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface IModalState {
  modalType: ModalType;
}

const initialState: IModalState = {
  modalType: ModalType.None
};

type ModalAction = 
  | { type: ModalActions.SHOW_FILE_MODAL; } 
  | { type: ModalActions.DISMISS; };

function reducer(
  state: IModalState,
  action: ModalAction
): IModalState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case ModalActions.SHOW_FILE_MODAL:
      return {
        ...state,
        modalType: ModalType.File
      };
    case ModalActions.SHOW_FILE_MODAL:
      return {
        ...state,
        modalType: ModalType.None
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
export const ModalStore = {
  State,
  Dispatch,
  Provider
};
