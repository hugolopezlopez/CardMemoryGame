import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import companyLogo from "../../assets/images/nen_logo.png";
import CardBoard from "../../component/CardBoard/CardBoard";
import { strings } from "../../assets/strings";
import Finish from "../../component/Finish/Finish";
import "./PlayScreen.css";

class PlayScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      gameStarted: false,
      resolved: false,
      failure: false,
      reset: false,
      pairsLeft: (props.match.params.rows * props.match.params.columns) / 2,
      attempts: 0,
      countDown: 60,
    };
  }

  onResolved = () => {
    this.setState({ resolved: true });
  };

  onPairFound = () => {
    const pairsLeft = this.state.pairsLeft - 1;
    this.setState({ pairsLeft: pairsLeft });
  };

  onAttempt = () => {
    const attempts = this.state.attempts + 1;
    this.setState({ attempts: attempts });
  };

  onReturnToLevelSelection = (rows, columns) => {
    this.props.navigate("/");
  };

  countDown = () => {
    if (!this.state.gameStarted) {
      this.setState({
        gameStarted: true,
      });
    }
    if (this.state.countDown > 1) {
      setTimeout(() => {
        if (!this.state.resolved) {
          this.setState({ countDown: this.state.countDown - 1 });
          this.countDown();
        }
      }, 1000);
    } else {
      this.setState({ failure: true });
    }
  };

  render() {
    return (
      <div className="mainCntnr">
        {!this.state.gameStarted && (
          <div className="startBtnCntnr">
            <button onClick={this.countDown} className="startButton">
              Start
            </button>
          </div>
        )}
        <div className="header">
          <button
            onClick={this.onReturnToLevelSelection}
            className="backButton"
          >
            {strings.playScreen.back}
          </button>
          <div className="subtitle">Seconds left {this.state.countDown}</div>
          <img className="logo" src={companyLogo} alt="Logo" />
        </div>
        {!this.state.resolved && !this.state.failure && (
          <CardBoard
            onResolved={this.onResolved}
            onPairFound={this.onPairFound}
            onAttempt={this.onAttempt}
          ></CardBoard>
        )}
        {(this.state.resolved || this.state.failure) && (
          <Finish
            onReturnToLevelSelection={this.onReturnToLevelSelection}
            resolved={this.state.resolved}
            failure={this.state.failure}
          ></Finish>
        )}
        <div className="footer">
          <div className="subtitle">
            {this.state.pairsLeft} {strings.playScreen.pairsLeft}
          </div>
          <div className="subtitle">
            {strings.playScreen.attempts} {this.state.attempts}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PlayScreen);
