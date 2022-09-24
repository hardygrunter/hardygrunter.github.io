import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundry extends Component {
  state = {
    error: false,
  };

  // static getDerviedStateFromError(error) {
  //   return {error: true};
  // }

  componentDidCatch(error, errorInfo) {
    this.setState({error: true});
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
