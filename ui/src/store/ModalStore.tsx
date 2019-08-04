import * as React from "react";

export enum ModalActions {
  SHOW_FILE_MODAL = "SHOW_FILE_MODAL",
  SHOW_SETTINGS_MODAL = "SHOW_SETTINGS_MODAL",
  SUBMIT_SETTINGS = "SUBMIT_SETTINGS",
  SUBMIT_CREATE_FILE = "SUBMIT_CREATE_FILE",
  DISMISS = "DISMISS"
}

export enum ModalType {
  None = -1,
  File = 0,
  Settings = 1
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
  | { type: ModalActions.SHOW_FILE_MODAL }
  | { type: ModalActions.SHOW_SETTINGS_MODAL }
  | { type: ModalActions.SUBMIT_SETTINGS; settings: string }
  | { type: ModalActions.SUBMIT_CREATE_FILE; file: string }
  | { type: ModalActions.DISMISS };

declare var settings;

function reducer(state: IModalState, action: ModalAction): IModalState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case ModalActions.SHOW_FILE_MODAL:
      return {
        ...state,
        modalType: ModalType.File
      };
    case ModalActions.SHOW_SETTINGS_MODAL:
      return {
        ...state,
        modalType: ModalType.Settings
      };
    case ModalActions.SUBMIT_SETTINGS: {
      settings.updateSettings(action.settings);
      return {
        ...state,
        modalType: ModalType.None
      };
    }
    case ModalActions.SUBMIT_CREATE_FILE: {
      // Create file
      return {
        ...state,
        modalType: ModalType.None
      };
    }
    case ModalActions.DISMISS:
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
