import { Component } from "react";

import { withRouter } from "../../helper/WithRouter";
import companyLogo from "../../assets/images/nen_logo.png";
import CardBoard from "../../component/CardBoard/CardBoard";
import Success from "../../component/Success/Success";
import { strings } from "../../assets/strings";
import "./PlayScreen.css";

class PlayScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      resolved: false,
      reset: false,
      pairsLeft: (props.match.params.rows * props.match.params.columns) / 2,
      attempts: 0,
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

  goToLevelSelectionScreen = (rows, columns) => {
    this.props.navigate('/');
  };

  render() {
    return (
      <div className="mainCntnr">
        <div className="header">
          <button onClick={this.goToLevelSelectionScreen} className="backButton">
            {strings.playScreen.back}
          </button>
          <img className="logo" src={companyLogo} alt="Logo" />
        </div>
        {!this.state.resolved ? (
          <CardBoard
            onResolved={this.onResolved}
            onPairFound={this.onPairFound}
            onAttempt={this.onAttempt}
          ></CardBoard>
        ) : (
          <Success goToLevelSelectionScreen={this.goToLevelSelectionScreen}></Success>
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
