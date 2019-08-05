import * as React from "react";
import { AkCodeBlock } from "@atlaskit/code";
import { MermaidBlock } from "./MermaidBlock";

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
      <div className="CodeBlock">
        {language === "mermaid" ? (
          <MermaidBlock className="" name="mermaid">
            {value}
          </MermaidBlock>
        ) : (
          <AkCodeBlock language={language} text={value} />
        )}
      </div>
    );
  }
}
