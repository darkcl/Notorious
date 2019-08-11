import * as React from "react";
import { MermaidBlock } from "./MermaidBlock";
import { JiraBlock } from "./JiraBlock";
import { ProgrammeCodeBlock } from "./ProgrammeCodeBlock";

interface ICodeBlock {
  value;
  language;
}

export class CodeBlock extends React.Component<ICodeBlock, {}> {
  constructor(props) {
    super(props);
  }

  codeBlock = (language, value) => {
    switch (language) {
      case "mermaid":
        return (
          <MermaidBlock className="" name="mermaid">
            {value}
          </MermaidBlock>
        );
      case "jira":
        return <JiraBlock issueKey={value} />;
      default:
        return <ProgrammeCodeBlock language={language} text={value} />;
    }
  };

  render() {
    const { language, value } = this.props;
    return <div className="CodeBlock">{this.codeBlock(language, value)}</div>;
  }
}
