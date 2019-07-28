import * as React from "react";
import SplitPane from "react-split-pane";
import * as ReactMarkdown from "react-markdown/with-html";

import "../style/App.css";
import { IAppState } from "../interface/IAppState";

import { Editor } from "./Editor";
import { CodeBlock } from "./CodeBlock";

class App extends React.Component<{}, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: "# Hello World\n\n[google](http://google.com)"
    };

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
  }

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md
    });
  }

  render() {
    return (
      <SplitPane split="vertical" defaultSize="50%">
        <div className="editor-pane">
          <Editor
            className="editor"
            value={this.state.markdownSrc}
            onChange={this.onMarkdownChange}
          />
        </div>
        <div className="view-pane">
          <ReactMarkdown
            className="result"
            source={this.state.markdownSrc}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </SplitPane>
    );
  }
}

export default App;
