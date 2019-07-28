import * as React from "react";
import SplitPane from "react-split-pane";
import * as ReactMarkdown from "react-markdown/with-html";

import "../style/EditorPage.css";
import { IEditorPageState } from "../interface/IEditorPageState";

import { Editor } from "../components/Editor";
import { CodeBlock } from "../components/CodeBlock";

export class EditorPage extends React.Component<{}, IEditorPageState> {
  constructor(props) {
    super(props);

    this.state = {
      markdownSrc: "# Hello World\n\n[google](http://google.com)",
      isPreview: false
    };
  }

  onMarkdownChange = value => {
    this.setState({
      markdownSrc: value
    });
  };

  onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);
  };

  render() {
    return (
      <div className="editor-page-content">
        {this.state.isPreview ? (
          <ReactMarkdown
            className="result"
            source={this.state.markdownSrc}
            renderers={{ code: CodeBlock }}
          />
        ) : (
          <Editor
            className="editor"
            value={this.state.markdownSrc}
            onChange={this.onMarkdownChange}
            onKeyDown={this.onKeyPressed}
          />
        )}
        ;
      </div>
    );
  }
}
