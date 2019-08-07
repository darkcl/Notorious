import * as React from "react";
import Button from "@atlaskit/button";
import { ButtonGroup } from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";
import BitbucketPullrequestsIcon from "@atlaskit/icon/glyph/bitbucket/pullrequests";
import BitbucketBranchesIcon from "@atlaskit/icon/glyph/bitbucket/branches";

import { JIRA } from "../services";
import { FlagStore, FlagActions } from "../store/FlagStore";

declare var settings;
declare var external;

const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div css={{ padding: 8 }} {...props} />
);

const PullRequestButton: React.FunctionComponent<{
  onPullRequestClick: () => void;
  isSetup: boolean;
}> = props => {
  return (
    <Tooltip
      content={props.isSetup ? "Please setup jira" : "Show Pull Request"}
    >
      <Button
        appearance="subtle-link"
        onClick={props.onPullRequestClick}
        iconBefore={
          <BitbucketPullrequestsIcon label="pullrequest" size="medium" />
        }
      />
    </Tooltip>
  );
};

const RepositoryButton: React.FunctionComponent<{
  onRepositoryClick: () => void;
  isSetup: boolean;
}> = props => (
  <Tooltip content={props.isSetup ? "Please setup jira" : "Show Repository"}>
    <Button
      onClick={props.onRepositoryClick}
      appearance="subtle-link"
      iconBefore={<BitbucketBranchesIcon label="repo" size="medium" />}
    />
  </Tooltip>
);

export const JiraBlock: React.FunctionComponent<{
  issueKey: string;
}> = props => {
  const flagDispatch = React.useContext(FlagStore.Dispatch);

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

  const onPullRequestClick = async () => {
    const client = getJiraClient();
    if (client !== null) {
      try {
        const res = await client.getIssue(props.issueKey);
        const prData = await client.getDevelopmentStatus(res.id);
      } catch (e) {
        flagDispatch({
          type: FlagActions.SHOW_WARNING,
          message: e.message
        });
      }
    }
  };

  const onRepositoryClick = () => {
    const client = getJiraClient();
    if (client !== null) {
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
            <PullRequestButton
              onPullRequestClick={onPullRequestClick}
              isSetup={getJiraClient() === null}
            />
            <RepositoryButton
              onRepositoryClick={onRepositoryClick}
              isSetup={getJiraClient() === null}
            />
          </ButtonGroup>
        </Row>
      </Row>
    </div>
  );
};
