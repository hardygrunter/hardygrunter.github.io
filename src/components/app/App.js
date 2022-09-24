import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../errorBoundary/ErrorBoundry";

import decoration from "../../resources/img/vision.png";

class App extends Component {
  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundry>
            <RandomChar />
          </ErrorBoundry>
          <div className="char__content">
            <ErrorBoundry>
              <CharList
                onCharSelected={this.onCharSelected}
              />
            </ErrorBoundry>
            <ErrorBoundry>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundry>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
