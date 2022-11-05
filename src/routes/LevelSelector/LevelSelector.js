import { Component } from "react";

import {withRouter} from '../../helper/WithRouter'
import { levels } from "../../config/config";
import { strings } from "../../assets/strings";
import companyLogo from "../../assets/images/nen_logo.png";
import "./LevelSelector.css";

class LevelSelector extends Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  getLevelButtons = () => {
    return levels.map((level) => {
      let columns = level.columns;
      let rows = level.rows;
      if (level.rows !== level.columns) {
        if (this.state.windowWidth < this.state.windowHeight) {
          columns = level.rows;
          rows = level.columns;
        }
      }
      return (
        <button
          onClick={() => {
            this.goToPlayScreen(rows, columns);
          }}
          className="button"
          key={level.difficulty}
        >
          {rows + "X" + columns + " (" + level.difficulty + ")"}
        </button>
      );
    });
  };

  goToPlayScreen = (rows, columns) => {
    this.props.navigate('/PlayScreen/' + rows + '/' + columns);
  };

  render() {
    return (
      <div className="mainCntnr">
        <div className="subCntnr">
          <img className="logo" src={companyLogo} alt="Logo" />
          <p className="title">{strings.levelSelector.title}</p>
          <p className="subtitle">{strings.levelSelector.subTitle}</p>
          <div className="buttonsCntnr">{this.getLevelButtons()}</div>
        </div>
        <div className="levelSelectorFooter">
          <p className="footerText">{strings.levelSelector.instructions}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(LevelSelector);
