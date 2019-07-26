import * as React from 'react';
import styled from 'styled-components';
import PageInterface from '../PageInterface';

const PStyled = styled("p")`
  background-color: red;
`;


class App extends React.Component<PageInterface, {}> {
  render() {
    return (<div>
      <h1>Welcome to React with Typescript</h1>
      <PStyled>The color of this page is: {this.props.color}</PStyled>
    </div>
    );
  }
}

export default App;