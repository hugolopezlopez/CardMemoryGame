import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import utils from "../../helper/utils";
import Card from "../Card/Card";
import "./CardBoard.css";

class CardBoard extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: props.match.params.rows,
      columns: props.match.params.columns,
      images: utils.getImageArray(
        props.match.params.rows,
        props.match.params.columns
      ),
      visibleImages: [],
      currentFlippedImage: undefined,
      hiddenImages: [],
    };
  }

  onClickCard = (id, index) => {
    if (
      this.state.visibleImages.indexOf(index) < 0 &&
      this.state.hiddenImages.indexOf(index) < 0 &&
      this.state.visibleImages.length < 2
    ) {
      this.flipCard(id, index);
    }
  };

  flipCard = (id, index) => {
    if (this.state.visibleImages.length === 1) {
      this.checkCardPair(id, index);
    } else {
      this.setState({ currentFlippedImage: id });
    }
    const currentFlippedImages = this.state.visibleImages;
    currentFlippedImages.push(index);
    this.setState({ visibleImages: currentFlippedImages });
  };

  checkCardPair = (id, index) => {
    if (this.state.currentFlippedImage === id) {
      this.onPairFound(index);
    } else {
      this.onPairNotFound();
    }
  };

  onPairFound = (index) => {
    setTimeout(() => {
      const currentHiddenImages = this.state.hiddenImages;
      currentHiddenImages.push(index, this.state.visibleImages[0]);
      this.setState({
        hiddenImages: currentHiddenImages,
        visibleImages: [],
      });
    }, 1000);
  };

  onPairNotFound = () => {
    setTimeout(() => {
      this.setState({ visibleImages: [], currentFlippedImage: 0 });
    }, 1000);
  };

  getBoard = () => {
    const board = [];
    let count = 0;
    for (let i = 1; i <= this.state.rows; i++) {
      const row = [];
      for (let j = 1; j <= this.state.columns; j++) {
        const index = count;
        row.push(
          <Card
            key={index}
            id={this.state.images[index]}
            index={index}
            onClickCard={this.onClickCard}
            img={this.state.images[index]}
            visible={this.state.visibleImages.indexOf(index) < 0}
            hidden={this.state.hiddenImages.indexOf(index) < 0}
          ></Card>
        );
        count++;
      }
      board.push(
        <div key={i} className="row">
          {row}
        </div>
      );
    }
    return board;
  };

  render() {
    return (
      <div className="boardCntnr">
        <div>{this.getBoard()}</div>
      </div>
    );
  }
}

export default withRouter(CardBoard);
