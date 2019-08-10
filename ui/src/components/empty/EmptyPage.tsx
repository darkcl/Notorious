import * as React from "react";
import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";

import { ModalStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";

const CreateButton: React.FunctionComponent = () => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  return (
    <Button
      appearance="primary"
      onClick={() => {
        modalDispatch({
          type: ModalActions.SHOW_FILE_MODAL
        });
      }}
    >
      Create Notes
    </Button>
  );
};

const props = {
  header: "You don't have any notes yet",
  description: `Create your first note`,
  primaryAction: <CreateButton />
};

export const EmptyPage: React.FunctionComponent = () => {
  return <EmptyState {...props} />;
};
