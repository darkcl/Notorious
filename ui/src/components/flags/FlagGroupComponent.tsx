import * as React from "react";
import Flag from "@atlaskit/flag";
import { FlagGroup } from "@atlaskit/flag";
import { FlagStore, FlagActions, IFlagState } from "../../store/FlagStore";

import Error from "@atlaskit/icon/glyph/error";
import Info from "@atlaskit/icon/glyph/info";
import Tick from "@atlaskit/icon/glyph/check-circle";
import Warning from "@atlaskit/icon/glyph/warning";

import { colors } from "@atlaskit/theme";

export const FlagGroupComponent: React.FunctionComponent = () => {
  const flagState: IFlagState = React.useContext(FlagStore.State);
  const flagDispatch = React.useContext(FlagStore.Dispatch);

  const dismissFlag = () => {
    flagDispatch({
      type: FlagActions.DISMISS
    });
  };

  const iconMap = (key: string, color?: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      info: <Info label="Info icon" primaryColor={color || colors.P300} />,
      success: (
        <Tick label="Success icon" primaryColor={color || colors.G300} />
      ),
      warning: (
        <Warning label="Warning icon" primaryColor={color || colors.Y300} />
      ),
      error: <Error label="Error icon" primaryColor={color || colors.R300} />
    };

    return icons[key];
  };

  const actions = [{ content: "Close", onClick: dismissFlag }];

  return (
    <FlagGroup onDismissed={dismissFlag}>
      {flagState.flags.map(flag => (
        <Flag
          id={flag.id}
          key={flag.id}
          actions={actions}
          icon={iconMap(flag.type)}
          title={flag.title}
          description={flag.description}
        />
      ))}
    </FlagGroup>
  );
};
