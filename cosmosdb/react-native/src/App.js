import React from "react";
import AppContainer from "./routes";
import { Root } from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
