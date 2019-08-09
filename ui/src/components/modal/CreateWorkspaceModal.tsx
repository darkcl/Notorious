import * as React from "react";
import Button from "@atlaskit/button";

import Form, { Field } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";

import ModalDialog, { ModalFooter } from "@atlaskit/modal-dialog";
import { ModalStore, EditorStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";
import { EditorActions } from "../../store/EditorStore";
export const CreateWorkspaceModal: React.FunctionComponent = props => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  const editorDispatch = React.useContext(EditorStore.Dispatch);
  const close = () => {
    modalDispatch({
      type: ModalActions.DISMISS
    });
  };

  const onFormSubmit = data => {
    if (data.title.length > 0) {
      console.log(data);
      modalDispatch({
        type: ModalActions.SUBMIT_CREATE_WORKSPACE,
        title: data.title
      });
      setTimeout(() => {
        editorDispatch({
          type: EditorActions.RELOAD_FILE
        });
      }, 100);
    } else {
      modalDispatch({
        type: ModalActions.DISMISS
      });
    }
  };

  const footer = props => (
    <ModalFooter showKeyline={props.showKeyline}>
      <span />
      <Button appearance="primary" type="submit">
        Create
      </Button>
    </ModalFooter>
  );

  return (
    <ModalDialog
      heading="Create Workspace"
      onClose={close}
      components={{
        Container: ({ children, className }) => (
          <Form onSubmit={onFormSubmit}>
            {({ formProps }) => (
              <form {...formProps} className={className}>
                {children}
              </form>
            )}
          </Form>
        ),
        Footer: footer
      }}
    >
      <Field label="Title" name="title">
        {({ fieldProps }) => <Textfield {...fieldProps} />}
      </Field>
    </ModalDialog>
  );
};
