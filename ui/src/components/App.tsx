import * as React from "react";
import SplitPane from "react-split-pane";
import * as ReactMarkdown from "react-markdown";

import "../style/App.css";
import { IAppState } from "../interface/IAppState";

import { Editor } from "./Editor";

class App extends React.Component<{}, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: "# Hello World"
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
          <ReactMarkdown className="result" source={this.state.markdownSrc} />
        </div>
      </SplitPane>
    );
  }
}

export default App;
