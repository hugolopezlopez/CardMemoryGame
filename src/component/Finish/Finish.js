import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import { strings } from "../../assets/strings";
import finishImage from "../../assets/images/finish.jpg";

import "./Finish.css";

class Finish extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="finishCntnr">
        <span className="finishMsg">
          {this.props.resolved ? strings.finish.congrats : strings.finish.timeOut}
        </span>
        <img className="finishImg" src={finishImage} alt="finish" />
        <div className="finishBtnCntnr">
          <button
            onClick={this.props.onReturnToLevelSelection}
            className="button"
          >
            {strings.finish.restart}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Finish);
