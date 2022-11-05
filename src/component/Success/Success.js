import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import { strings } from "../../assets/strings";
import succcessImage from "../../assets/images/success.jpg";

import "./Success.css";

class Success extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="successCntnr">
        <span className="successMsg">
          {strings.success.congrats}
        </span>
        <img className="successImg" src={succcessImage} alt="success" />
        <div className="successBtnCntnr">
          <button
            onClick={this.props.goToLevelSelectionScreen}
            className="button"
          >
            {strings.success.restart}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Success);
