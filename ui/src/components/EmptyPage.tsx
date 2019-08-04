import * as React from "react";
import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";

import emptyImage from "../../static/img/empty.png";

console.log(emptyImage);

const primaryAction = (
  <Button
    appearance="primary"
    onClick={() => console.log("primary action clicked")}
  >
    Create Notes
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
  header: "You don't have any notes yet",
  description: `Create your first note`,
  primaryAction,
  imageUrl: emptyImage
};

export const EmptyPage: React.FunctionComponent = () => {
  return <EmptyState {...props} />;
};
