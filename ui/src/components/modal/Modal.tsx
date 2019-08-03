import * as React from "react";
import ModalDialog from "@atlaskit/modal-dialog";
import { ModalTransition } from "@atlaskit/modal-dialog";
import { ModalStore } from "../../store";
import { ModalType, ModalActions } from "../../store/ModalStore";

import { SettingsModal } from "./SettingsModal";

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

  const getModal = (type: ModalType) => {
    switch (type) {
      case ModalType.Settings: {
        return <SettingsModal />;
      }
      default: {
        return (
          <ModalDialog actions={actions} onClose={close} heading="Modal Title">
            <p>Hello file picker</p>
          </ModalDialog>
        );
      }
    }
  };

  return (
    <ModalTransition>
      {modalState.modalType !== ModalType.None &&
        getModal(modalState.modalType)}
    </ModalTransition>
  );
};
