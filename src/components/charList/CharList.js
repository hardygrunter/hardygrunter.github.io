import React, { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  itemRefs = [];

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.oncharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  oncharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  setRef = (ref) => {
    this.itemRefs.push(ref);
  }

  focusOnItem = (id) => {
    this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRefs[id].classList.add('char__item_selected');
    this.itemRefs[id].focus();
  }

  renderItems(arr) {
    const items = arr.map((item, i) => {
      const imgStyle =
        item.thumbnail.indexOf("image_not_available") === -1
          ? { objectFit: "cover" }
          : { objectFit: "unset" };

      return (
        <li
          ref={this.setRef}
          className="char__item"
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.code === "Space" || e.code === "Enter") {
            e.preventDefault();
              this.focusOnItem(i);
            }
          }}
          tabIndex={0}
        >
          <img src={item.thumbnail} style={imgStyle} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } =
      this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
