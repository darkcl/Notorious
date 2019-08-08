import * as React from "react";
import InlineDialog from "@atlaskit/inline-dialog";
import Button from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";
import BitbucketBranchesIcon from "@atlaskit/icon/glyph/bitbucket/branches";
import { JIRA } from "../../services";
import { FlagStore, FlagActions } from "../../store/FlagStore";
import Tabs from "@atlaskit/tabs";
import Spinner from "@atlaskit/spinner";

import { DynamicTableStateless } from "@atlaskit/dynamic-table";

import { PullRequestRows } from "./rows/PullRequestRows";

declare var settings;

import styled from "styled-components";
import { borderRadius, colors, gridSize, math, themed } from "@atlaskit/theme";

const Content = styled.div`
  align-items: center;
  border-radius: ${borderRadius}px;
  color: ${colors.subtleText};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 4em;
  font-weight: 500;
  justify-content: center;
  margin-bottom: ${gridSize}px;
  margin-top: ${math.multiply(gridSize, 2)}px;
`;

export const DevStatusDialog: React.FunctionComponent<{
  issueKey: string;
}> = props => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pullRequests, setPullRequests] = React.useState([]);
  const [repositories, setRepositories] = React.useState([]);
  const flagDispatch = React.useContext(FlagStore.Dispatch);

  const tabs = [
    {
      label: "Pull Requests",
      content: (
        <div>
          <DynamicTableStateless
            rows={PullRequestRows(pullRequests)}
            loadingSpinnerSize="large"
            isLoading={isLoading}
            isFixedSize
            onSort={() => console.log("onSort")}
            onSetPage={() => console.log("onSetPage")}
          />
        </div>
      )
    },
    { label: "Repositories", content: <Content>Two</Content> }
  ];

  const TabsContent: React.FunctionComponent = props => (
    <Tabs
      tabs={tabs}
      onSelect={(_tab, index) => console.log("Selected Tab", index + 1)}
    />
  );

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
  const openDialog = async () => {
    const client = getJiraClient();
    if (client !== null) {
      setIsDialogOpen(true);
      setIsLoading(true);
      try {
        const res = await client.getIssue(props.issueKey);
        const prData = await client.getDevelopmentStatus(res.id);
        if (prData.detail.length > 0) {
          setPullRequests(prData.detail[0].pullRequests || []);
          setRepositories(prData.detail[0].repositories || []);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        flagDispatch({
          type: FlagActions.SHOW_WARNING,
          message: e.message
        });
      }
    } else {
      flagDispatch({
        type: FlagActions.SHOW_WARNING,
        message: "Please setup jira in settings"
      });
    }
  };

  const dialogClosed = () => {
    setIsDialogOpen(false);
  };

  const content = (
    <div style={{ width: "300px" }}>
      <TabsContent />
    </div>
  );

  return (
    <div>
      <InlineDialog
        content={content}
        isOpen={isDialogOpen}
        onClose={dialogClosed}
      >
        <Button
          appearance="subtle-link"
          iconBefore={<BitbucketBranchesIcon label="repo" size="medium" />}
          onClick={openDialog}
          isDisabled={isDialogOpen}
        />
      </InlineDialog>
    </div>
  );
};
