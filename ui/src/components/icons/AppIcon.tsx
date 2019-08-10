import * as React from "react";
import Icon from "@atlaskit/icon";

const customGlyph = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
  >
    <g fill="currentColor" fillRule="evenodd">
      <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h10l6-6V5C21,3.895,20.105,3,19,3z M7,7h10v2H7V7z M12,13H7v-2h5V13z M14,19.5V14h5.5L14,19.5z" />
    </g>
  </svg>
);

export class AppIcon extends React.Component<{}, {}> {
  render() {
    return <Icon glyph={customGlyph} label="Custom icon" size="large" />;
  }
}
