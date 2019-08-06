import * as React from "react";
import Button from "@atlaskit/button";

import Form, { Field, CheckboxField } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";

import ModalDialog, { ModalFooter } from "@atlaskit/modal-dialog";
import { ModalStore } from "../../store";
import { ModalActions } from "../../store/ModalStore";

declare var settings;

export const SettingsModal: React.FunctionComponent = () => {
  const modalDispatch = React.useContext(ModalStore.Dispatch);
  const close = () => {
    modalDispatch({
      type: ModalActions.DISMISS
    });
  };

  const onFormSubmit = data => {
    const form = {
      ...settings.data.settings,
      jira: {
        baseUrl: data.jiraBaseUrl,
        user: data.jiraUser,
        accessToken: data.jiraToken
      }
    };
    modalDispatch({
      type: ModalActions.SUBMIT_SETTINGS,
      settings: JSON.stringify(form)
    });
  };

  const footer = props => (
    <ModalFooter showKeyline={props.showKeyline}>
      <span />
      <Button appearance="primary" type="submit">
        Update
      </Button>
    </ModalFooter>
  );

  return (
    <ModalDialog
      heading="Settings"
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
      <Field
        label="JIRA Host"
        name="jiraBaseUrl"
        defaultValue={settings.data.settings.jira.baseUrl}
      >
        {({ fieldProps }) => <Textfield {...fieldProps} />}
      </Field>
      <Field
        label="JIRA Login"
        name="jiraUser"
        defaultValue={settings.data.settings.jira.user}
      >
        {({ fieldProps }) => <Textfield autoComplete="off" {...fieldProps} />}
      </Field>
      <Field
        label="JIRA Access Token"
        name="jiraToken"
        defaultValue={settings.data.settings.jira.accessToken}
      >
        {({ fieldProps }) => (
          <Textfield autoComplete="off" {...fieldProps} type="password" />
        )}
      </Field>
    </ModalDialog>
  );
};
