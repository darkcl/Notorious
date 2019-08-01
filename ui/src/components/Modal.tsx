import * as React from "react";
import ModalDialog from "@atlaskit/modal-dialog";
import { ModalTransition } from "@atlaskit/modal-dialog";
import { ModalStore } from "../store";
import { ModalType, ModalActions } from "../store/ModalStore";

export const Modal: React.FunctionComponent = () => {
  const modalState = React.useContext(ModalStore.State);
  const modalDispatch = React.useContext(ModalStore.Dispatch);

  const close = () => {
    modalDispatch({
      type: ModalActions.DISMISS
    });
  };

  const actions = [
    { text: "Close", onClick: close },
    { text: "Secondary Action", onClick: this.secondaryAction }
  ];

  return (
    <ModalTransition>
      {modalState.modalType !== ModalType.None && (
        <ModalDialog actions={actions} onClose={close} heading="Modal Title">
          <p>Hello file picker</p>
        </ModalDialog>
      )}
    </ModalTransition>
  );
};
