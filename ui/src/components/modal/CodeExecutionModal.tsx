import * as React from "react";
import ModalDialog from "@atlaskit/modal-dialog";
import { ModalStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";
import { CodeExecService } from "../../services/code_exec/CodeExec";
import Spinner from "@atlaskit/spinner";
import { AkCodeBlock } from "@atlaskit/code";
import styled from "styled-components";

const ConsoleOutput = styled.div`
  padding-top: 10px;
`;

export const CodeExecutionModal: React.FunctionComponent = props => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);

  const close = () => {
    modalDispatch({
      type: ModalActions.DISMISS
    });
  };

  const actions = [{ text: "Close", onClick: close }];

  const checkIsCompleted = () => {
    const codeExec = CodeExecService();
    if (codeExec.data.task !== undefined) {
      return codeExec.data.task.isCompleted;
    }
    return false;
  };

  const consoleOutput = () => {
    const codeExec = CodeExecService();
    if (codeExec.data.task !== undefined) {
      return codeExec.data.task.output;
    }
    return "";
  };

  const errorOutput = () => {
    const codeExec = CodeExecService();
    if (
      codeExec.data.task !== undefined &&
      codeExec.data.task.error !== undefined
    ) {
      return codeExec.data.task.error;
    }
    return "";
  };

  return (
    <ModalDialog
      actions={actions}
      onClose={close}
      heading="Code Execution Result"
    >
      {checkIsCompleted() ? (
        <div>
          <h3>Console Output</h3>
          <ConsoleOutput>
            <AkCodeBlock text={consoleOutput()} />
          </ConsoleOutput>
          <br />
          {errorOutput().length !== 0 && (
            <div>
              <h3>Error Output</h3>
              <ConsoleOutput>
                <AkCodeBlock text={errorOutput()} />
              </ConsoleOutput>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </ModalDialog>
  );
};
