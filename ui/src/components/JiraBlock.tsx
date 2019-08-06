import * as React from "react";
import Button from "@atlaskit/button";
import { ButtonGroup } from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";

declare var settings;
declare var external;

const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div css={{ padding: 8 }} {...props} />
);

export class JiraBlock extends React.Component<{ issueKey: string }, {}> {
  constructor(props) {
    super(props);
  }

  onIssueButtonClick = () => {
    if (
      settings.data.settings.jira.baseUrl !== null &&
      settings.data.settings.jira.baseUrl !== undefined
    ) {
      external.invoke(
        "openlink: " +
          `${settings.data.settings.jira.baseUrl}/browse/${this.props.issueKey}`
      );
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
              <Tooltip content="Load more...">
                <Button>...</Button>
              </Tooltip>
            </ButtonGroup>
          </Row>
        </Row>
      </div>
    );
  }
}
