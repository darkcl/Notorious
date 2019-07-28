import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ICodeBlock {
  value;
  language;
}

export class CodeBlock extends React.Component<ICodeBlock, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={solarizedlight}>
        {value}
      </SyntaxHighlighter>
    );
  }
}
