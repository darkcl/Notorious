import * as React from "react";
import Button from "@atlaskit/button";
import { ButtonGroup } from "@atlaskit/button";

import { JIRA } from "../../services";
import { DevStatusDialog } from "../devstatus/DevStatusDialog";

declare var settings;
declare var external;

const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div css={{ padding: 8 }} {...props} />
);

export const JiraBlock: React.FunctionComponent<{
  issueKey: string;
}> = props => {
  const getJiraClient = () => {
    // Get Jira Setting from golang bindings
    const jiraSettings = settings.data.settings.jira;

    if (
      jiraSettings.baseUrl.length !== 0 &&
      jiraSettings.user.length !== 0 &&
      jiraSettings.accessToken.length !== 0
    ) {
      return new JIRA(
        jiraSettings.baseUrl,
        jiraSettings.user,
        jiraSettings.accessToken
      );
    }
    return null;
  };

  const onIssueButtonClick = () => {
    if (getJiraClient() !== null) {
      external.invoke(
        "openlink: " +
          `${settings.data.settings.jira.baseUrl}/browse/${props.issueKey}`
      );
    }
  };

  return (
    <div>
      <Row>
        <Row>
          <ButtonGroup appearance="default">
            <Button
              onClick={async () => {
                await onIssueButtonClick();
              }}
            >
              Open <strong>{props.issueKey}</strong>
            </Button>
            <DevStatusDialog issueKey={props.issueKey} />
          </ButtonGroup>
        </Row>
      </Row>
    </div>
  );
};
