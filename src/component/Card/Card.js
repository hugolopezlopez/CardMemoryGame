import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import companyLogo from "../../assets/images/nen_logo.png";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super();
    this.state = {
      imageName: undefined,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  componentDidMount = () => {
    this.setState({ imageName: this.props.img });
  };

  getWidth = () => {
    return (
      (((this.state.windowWidth - 40) / this.props.match.params.columns) * 100) /
        this.state.windowWidth +
      "vw"
    );
  };

  getMaxHeight = () => {
    return (
      (((this.state.windowHeight - 150) / this.props.match.params.rows) * 100) /
        this.state.windowHeight +
      "vh"
    );
  };

  render() {
    return (
      <div
        id={this.props.id}
        onClick={(event) =>
          this.props.onClickCard(event.currentTarget.id, this.props.index)
        }
        className="cardCntnr"
      >
        <div
          className="card"
          style={{
            borderStyle: this.props.hidden ? "solid" : "hidden",
            transform: !this.props.visible ? "rotateY(180deg)" : "",
            width: this.getWidth(),
            height: this.getWidth(),
            maxWidth: this.getMaxHeight(),
            maxHeight: this.getMaxHeight(),
          }}
        >
          <div className="front">
            <img
              className="img"
              src={companyLogo}
              alt="card"
              style={{
                opacity: this.props.hidden ? 1 : 0,
              }}
            />
          </div>
          <div className="back">
            <img
              className="img"
              src={
                this.state.imageName &&
                require("../../assets/images/cards/" +
                  this.state.imageName +
                  ".png")
              }
              alt="card"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
