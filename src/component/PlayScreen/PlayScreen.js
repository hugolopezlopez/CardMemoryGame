import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import companyLogo from "../../assets/images/nen_logo.png";
import CardBoard from "../CardBoard/CardBoard";
import "./PlayScreen.css";

class PlayScreen extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="mainCntnr">
        <img className="logo" src={companyLogo} alt="Logo" />
        <CardBoard></CardBoard>
      </div>
    );
  }
}

export default withRouter(PlayScreen);
