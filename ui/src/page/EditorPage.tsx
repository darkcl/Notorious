import * as React from "react";
import * as ReactMarkdown from "react-markdown/with-html";

import "../style/EditorPage.css";

import { Editor } from "../components/Editor";
import { CodeBlock } from "../components/CodeBlock";

export const EditorPage = props => {
  const [markdown, setMarkdown] = React.useState(
    "# Hello World\n\n[google](http://google.com)"
  );
  return (
    <div className="editor-page-content">
      {props.isPreview ? (
        <ReactMarkdown
          className="result"
          source={markdown}
          renderers={{ code: CodeBlock }}
        />
      ) : (
        <Editor
          className="editor"
          value={markdown}
          onChange={value => setMarkdown(value)}
        />
      )}
    </div>
  );
};
