import * as React from "react";
import Button from "@atlaskit/button";
import { ButtonGroup } from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";
import BitbucketPullrequestsIcon from "@atlaskit/icon/glyph/bitbucket/pullrequests";
import BitbucketBranchesIcon from "@atlaskit/icon/glyph/bitbucket/branches";

import { JIRA } from "../services";

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

export class JiraBlock extends React.Component<{ issueKey: string }, {}> {
  constructor(props) {
    super(props);
  }

  getJiraClient = () => {
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

  onIssueButtonClick = () => {
    if (this.getJiraClient() !== null) {
      external.invoke(
        "openlink: " +
          `${settings.data.settings.jira.baseUrl}/browse/${this.props.issueKey}`
      );
    }
  };

  onPullRequestClick = () => {
    if (this.getJiraClient() !== null) {
    } else {
    }
  };

  onRepositoryClick = () => {
    if (this.getJiraClient() !== null) {
    } else {
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Row>
            <ButtonGroup appearance="default">
              <Button onClick={this.onIssueButtonClick}>
                Open <strong>{this.props.issueKey}</strong>
              </Button>
              <PullRequestButton
                onPullRequestClick={this.onPullRequestClick}
                isSetup={this.getJiraClient() === null}
              />
              <RepositoryButton
                onRepositoryClick={this.onRepositoryClick}
                isSetup={this.getJiraClient() === null}
              />
            </ButtonGroup>
          </Row>
        </Row>
      </div>
    );
  }
}
