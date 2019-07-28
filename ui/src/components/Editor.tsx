import * as React from "react";
import * as CodeMirror from "@skidding/react-codemirror";
import { IEditor } from "../interface/IEditor";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/monokai.css";

declare var external;

export class Editor extends React.Component<
  IEditor & React.HTMLAttributes<HTMLDivElement>,
  {}
> {
  constructor(props) {
    super(props);

    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(e) {
    this.props.onChange(e);
  }

  render() {
    var options = {
      mode: "markdown",
      theme: "monokai"
    };
    return (
      <CodeMirror
        value={this.props.value}
        options={options}
        height="100%"
        onChange={this.updateCode}
      />
    );
  }
}
