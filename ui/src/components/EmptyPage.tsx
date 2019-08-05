import * as React from "react";
import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";

import emptyImage from "../../static/img/empty.png";
import { ModalStore } from "../store";
import { ModalActions } from "../store/ModalStore";

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

const secondaryAction = (
  <Button onClick={() => console.log("secondary action clicked")}>
    Use Default
  </Button>
);

const tertiaryAction = (
  <Button
    appearance="subtle-link"
    href="http://www.example.com"
    target="_blank"
  >
    Tertiary action
  </Button>
);

const props = {
  header: "You don't have any notes yet",
  description: `Create your first note`,
  primaryAction: <CreateButton />,
  imageUrl: emptyImage
};

export const EmptyPage: React.FunctionComponent = () => {
  return <EmptyState {...props} />;
};
