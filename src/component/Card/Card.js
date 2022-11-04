import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import companyLogo from "../../assets/images/nen_logo.png";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super();
    this.state = {
      imageSrc: undefined,
    };
  }

  componentDidMount = () => {
    this.setState({ imageSrc: this.props.img });
  };

  render() {
    return (
      <div
        id={this.props.id}
        onClick={(event) => this.props.onClickCard(event.currentTarget.id, this.props.index)}
        className="cardCntnr"
        style={{
          borderStyle: this.props.hidden ? "solid" : "hidden",
        }}
      >
        {this.props.visible && (
          <img
            className="card"
            src={companyLogo}
            alt="card"
            style={{
              opacity: this.props.hidden ? 1 : 0,
            }}
          />
        )}
        {!this.props.visible && (
          <img
            className="card"
            src={
              this.state.imageSrc &&
              require("../../assets/images/cards/" +
                this.state.imageSrc +
                ".png")
            }
            alt="card"
          />
        )}
      </div>
    );
  }
}

export default withRouter(Card);
