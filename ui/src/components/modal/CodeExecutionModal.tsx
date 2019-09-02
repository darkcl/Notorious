import * as React from "react";
import { useEffect } from "react";
import ModalDialog from "@atlaskit/modal-dialog";
import { ModalStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";
import { CodeExecutionResponse } from "../../services/code_exec/CodeExec";
import Spinner from "@atlaskit/spinner";
import { AkCodeBlock } from "@atlaskit/code";
import styled from "styled-components";

const ConsoleOutput = styled.div`
  padding-top: 10px;
`;

interface IModalProps {
  language: string;
  code: string;
}

export const CodeExecutionModal: React.FunctionComponent<
  IModalProps
> = props => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  const [output, setOutput] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isCompleted, setIsCompleted] = React.useState(false);

  useEffect(() => {
    console.log("Trigger");
    if (isCompleted) return;
    const { language, code } = props;
    window.renderer.send({
      evt: "code-exec-request",
      val: JSON.stringify({ language, code })
    });
    window.renderer.on(
      "code-exec-response",
      (evt, val: CodeExecutionResponse) => {
        console.log(`output: ${val}`);
        if (val.error !== undefined) {
          setError(val.error);
        }
        setOutput(val.output);
        setIsCompleted(true);
      }
    );
  });

  const close = () => {
    modalDispatch({
      type: ModalActions.DISMISS
    });
  };

  const actions = [{ text: "Close", onClick: close }];

  const checkIsCompleted = () => {
    return isCompleted;
  };

  const consoleOutput = () => {
    return output || "";
  };

  const errorOutput = () => {
    return error || "";
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
