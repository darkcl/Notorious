import * as React from "react";
import * as ReactMarkdown from "react-markdown/with-html";

import "../style/EditorPage.css";

import { Editor } from "../components/Editor";
import { CodeBlock } from "../components/CodeBlock";
import { EditorStore } from "../store";
import { EditorActions } from "../store/EditorStore";

export const EditorPage = () => {
  const editorDispatch = React.useContext(EditorStore.Dispatch);
  const editorState = React.useContext(EditorStore.State);

  return (
    <div className="editor-page-content">
      {editorState.isPreview ? (
        <ReactMarkdown
          className="result"
          source={editorState.markdown}
          renderers={{ code: CodeBlock }}
        />
      ) : (
        <Editor
          className="editor"
          value={editorState.markdown}
          onChange={value =>
            editorDispatch({
              type: EditorActions.UPDATE_MARKDOWN,
              markdown: value
            })
          }
        />
      )}
    </div>
  );
};
