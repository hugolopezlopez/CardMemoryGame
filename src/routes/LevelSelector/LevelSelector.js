import React from "react";

import { levels } from "../../config/config";
import cardService from "../../services/card.service";
import { strings } from "../../assets/strings";
import companyLogo from "../../assets/images/nen_logo.png";
import "./LevelSelector.css";

function LevelSelector(props) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const getLevelButtons = () => {
    return levels.map((level) => {
      const {rows, columns} = cardService.getRowsAndColumns(level, windowWidth, windowHeight);
      return (
        <button
          onClick={() => {
            goToPlayScreen(rows, columns);
          }}
          className="button"
          key={level.difficulty}
        >
          {strings.levelSelector.levelButton(rows, columns, level.difficulty)}
        </button>
      );
    });
  };

  const goToPlayScreen = (rows, columns) => {
    cardService.setRowsAndColumns(rows, columns);
    props.handleNavigation("/PlayScreen");
  };

  return (
    <div className="mainCntnr">
      <div className="subCntnr">
        <img className="logo" src={companyLogo} alt="Logo" />
        <p className="title">{strings.levelSelector.title}</p>
        <p className="subtitle">{strings.levelSelector.subTitle}</p>
        <div className="buttonsCntnr">{getLevelButtons()}</div>
      </div>
      <div className="levelSelectorFooter">
        <p className="footerText">{strings.levelSelector.instructions}</p>
      </div>
    </div>
  );
}

export default LevelSelector;
