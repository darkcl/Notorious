import * as React from "react";
import Button from "@atlaskit/button";

import Form, { Field } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";

import ModalDialog, { ModalFooter } from "@atlaskit/modal-dialog";
import { ModalStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";

export const CreateFileModal: React.FunctionComponent = () => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  const close = () => {
    modalDispatch({
      type: ModalActions.DISMISS
    });
  };

  const onFormSubmit = data => {
    const form = {
      title: data.title
    };
    console.log(form);
    modalDispatch({
      type: ModalActions.SUBMIT_CREATE_FILE,
      settings: JSON.stringify(form)
    });
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
      heading="Create Note"
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
