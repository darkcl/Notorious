import * as React from "react";
import { useContext } from "react";
import * as ReactMarkdown from "react-markdown/with-html";

import "../style/EditorPage.css";
import { IEditorPageState } from "../interface/IEditorPageState";

import { Editor } from "../components/Editor";
import { CodeBlock } from "../components/CodeBlock";
import { AppContext } from "../state/AppContext";

export const EditorPage = props => {
  const [markdown, setMarkdown] = React.useState(
    "# Hello World\n\n[google](http://google.com)"
  );
  const { isPreview, dispatch } = React.useContext(AppContext);
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
          onKeyDown={this.onKeyPressed}
        />
      )}
    </div>
  );
};
