import React from "react";

import { strings } from "../../assets/strings";
import finishImage from "../../assets/images/finish.jpg";

import "./Finish.css";

function Finish(props) {
  return (
    <div className="finishCntnr">
      <span className="finishMsg">
        {props.resolved ? strings.finish.congrats : strings.finish.timeOut}
      </span>
      <img className="finishImg" src={finishImage} alt="finish" />
      <div className="finishBtnCntnr">
        <button
          onClick={props.onReturnToLevelSelection}
          className="button"
        >
          {strings.finish.restart}
        </button>
      </div>
    </div>
  );
}

export default Finish;
