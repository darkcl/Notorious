import * as React from "react";
import Error from "@atlaskit/icon/glyph/error";
import Info from "@atlaskit/icon/glyph/info";
import Tick from "@atlaskit/icon/glyph/check-circle";
import Warning from "@atlaskit/icon/glyph/warning";
import { colors } from "@atlaskit/theme";

export enum FlagActions {
  SHOW_MESSAGE = "SHOW_MESSAGE",
  DISMISS = "DISMISS"
}

export enum FlagType {
  None = -1,
  Message = 0
}

export interface FlagData {
  created: number;
  description: string;
  id: number;
  key: number;
  title: string;
}

const State = React.createContext(null);
const Dispatch = React.createContext(null);

interface IFlagState {
  flagCount: number;
  flags: FlagData[];
}

const initialState: IFlagState = {
  flags: [],
  flagCount: 0
};

type FlagAction =
  | { type: FlagActions.SHOW_MESSAGE; message: string }
  | { type: FlagActions.DISMISS };

const getRandomIcon = () => {
  const icons = iconMap() as { [key: string]: object };
  const iconArray = Object.keys(icons).map(i => icons[i]);
  return iconArray[Math.floor(Math.random() * iconArray.length)];
};

const iconMap = (key?: string, color?: string) => {
  const icons: { [key: string]: React.ReactElement } = {
    info: <Info label="Info icon" primaryColor={color || colors.P300} />,
    success: <Tick label="Success icon" primaryColor={color || colors.G300} />,
    warning: (
      <Warning label="Warning icon" primaryColor={color || colors.Y300} />
    ),
    error: <Error label="Error icon" primaryColor={color || colors.R300} />
  };

  return key ? icons[key] : icons;
};

const getRandomDescription = () => {
  const descriptions = [
    "Marzipan croissant pie. Jelly beans gingerbread caramels brownie icing.",
    "Fruitcake topping wafer pie candy dragée sesame snaps cake. Cake cake cheesecake. Pie tiramisu carrot cake tart tart dessert cookie. Lemon drops cookie tootsie roll marzipan liquorice cotton candy brownie halvah."
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getFlagData = (index: number, timeOffset: number = 0): FlagData => {
  return {
    created: Date.now() - timeOffset * 1000,
    description: getRandomDescription(),
    id: index,
    key: index,
    title: `${index + 1}: Whoa a new flag!`
  };
};

function reducer(state: IFlagState, action: FlagAction): IFlagState {
  console.log("reducer:", state, action);
  switch (action.type) {
    case FlagActions.SHOW_MESSAGE: {
      const flags = state.flags.slice();
      flags.unshift(getFlagData(state.flagCount++));
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
