import * as React from "react";
import Button from "@atlaskit/button";

declare var settings;
declare var external;

export class JiraBlock extends React.Component<{ issueKey: string }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        onClick={() => {
          if (
            settings.data.settings.jira.baseUrl !== null &&
            settings.data.settings.jira.baseUrl !== undefined
          ) {
            external.invoke(
              "openlink: " +
                `${settings.data.settings.jira.baseUrl}/browse/${
                  this.props.issueKey
                }`
            );
          }
        }}
      >
        Open <strong>{this.props.issueKey}</strong>
      </Button>
    );
  }
}
