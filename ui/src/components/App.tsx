import * as React from "react";
import styled from "styled-components";
import PageInterface from "../interface/Pageinterface";
import FileList from "./FileList";
import Editor from "./Editor";

const PStyled = styled("p")`
  background-color: red;
`;

class App extends React.Component<PageInterface, {}> {
  render() {
    return (
      <div>
        <div className="EditorContainer">
          <Editor />
        </div>
        <h1> Go Data </h1>open
        <FileList />
      </div>
    );
  }
}

export default App;
