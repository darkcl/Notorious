import * as React from "react";
import Flag from "@atlaskit/flag";
import { FlagGroup } from "@atlaskit/flag";
import { FlagStore, FlagActions } from "../store/FlagStore";

export const FlagGroupComponent: React.FunctionComponent = () => {
  const flagState = React.useContext(FlagStore.State);
  const flagDispatch = React.useContext(FlagStore.Dispatch);

  const dismissFlag = () => {
    flagDispatch({
      type: FlagActions.DISMISS
    });
  };

  const actions = [
    {
      content: "Nice one!",
      onClick: () => {}
    },
    { content: "Not right now thanks", onClick: dismissFlag }
  ];

  return (
    <FlagGroup onDismissed={dismissFlag}>
      {flagState.flags.map(flag => (
        <Flag
          id={flag.id}
          key={flag.id}
          actions={actions}
          icon={null}
          title="Flag Title"
          description="Flag description"
        />
      ))}
    </FlagGroup>
  );
};
