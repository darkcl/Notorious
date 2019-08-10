import * as React from "react";
import { FlagStore, FlagActions } from "../../store/FlagStore";

export class ErrorBoundary extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    const flagDispatch = React.useContext(FlagStore.Dispatch);
    flagDispatch({
      type: FlagActions.SHOW_MESSAGE,
      message: "testing"
    });
  }

  render() {
    return this.props.children;
  }
}
