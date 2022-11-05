import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import companyLogo from "../../assets/images/nen_logo.png";
import CardBoard from "../CardBoard/CardBoard";
import Success from "../Success/Success";
import "./PlayScreen.css";

class PlayScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      resolved: false,
      reset: false
    };
  }

  onResolved = () => {
    this.setState({ resolved: true });
  };

  render() {
    return (
      <div className="mainCntnr">
        <img className="logo" src={companyLogo} alt="Logo" />
        {!this.state.resolved ? (
          <CardBoard onResolved={this.onResolved}></CardBoard>
        ) : (
          <Success></Success>
        )}
      </div>
    );
  }
}

export default withRouter(PlayScreen);
