import * as React from "react";
import * as mermaid from "mermaid";
import { mermaidAPI } from "mermaid";

mermaid.initialize({ startOnLoad: false });

export class MermaidBlock extends React.Component<
  { name: string; className: string },
  { diagram: string; error: Error }
> {
  constructor(props) {
    super(props);
    this.state = {
      diagram: "Loading diagram...",
      error: null
    };
  }

  componentDidMount = () => {
    try {
      mermaidAPI.parse(this.props.children.toString());
      mermaidAPI.render(
        this.props.name,
        this.props.children.toString(),
        diagram => this.setState({ diagram })
      );
    } catch (e) {
      console.log(e);
      this.setState({
        error: e
      });
      return;
    }
  };

  render = () => {
    return this.state.error !== null ? (
      <div>
        <pre>{this.state.error["str"]}</pre>
      </div>
    ) : (
      <div
        className={`mermaid ${this.props.className}`}
        dangerouslySetInnerHTML={{ __html: this.state.diagram }}
      />
    );
  };
}
