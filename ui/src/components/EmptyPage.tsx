import * as React from "react";
import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";

const primaryAction = (
  <Button
    appearance="primary"
    onClick={() => console.log("primary action clicked")}
  >
    Open...
  </Button>
);

const secondaryAction = (
  <Button onClick={() => console.log("secondary action clicked")}>
    Use Default
  </Button>
);

const tertiaryAction = (
  <Button
    appearance="subtle-link"
    href="http://www.example.com"
    target="_blank"
  >
    Tertiary action
  </Button>
);

const props = {
  header: "Select a folder",
  description: `Select a folder storing your notes`,
  primaryAction
};

export const EmptyPage: React.FunctionComponent = () => {
  return <EmptyState {...props} />;
};
