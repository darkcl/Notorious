import * as React from "react";
import * as mermaid from "mermaid";
import { mermaidAPI } from "mermaid";

mermaid.initialize({ startOnLoad: false });

export class MermaidBlock extends React.Component<
  { name: string; className: string },
  { diagram: string }
> {
  constructor(props) {
    super(props);
    this.state = {
      diagram: "Loading diagram..."
    };
  }

  componentDidMount = () => {
    mermaidAPI.render(
      this.props.name,
      this.props.children.toString(),
      diagram => this.setState({ diagram })
    );
  };

  render = () => (
    <div
      className={`mermaid ${this.props.className}`}
      dangerouslySetInnerHTML={{ __html: this.state.diagram }}
    />
  );
}
