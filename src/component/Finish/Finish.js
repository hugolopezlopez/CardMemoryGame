import React, { useState } from "react";

import { strings } from "../../assets/strings";
import finishImage from "../../assets/images/finish.jpg";
import scoreService from "../../services/score.service";

import "./Finish.css";

function Finish(props) {
  const [initials, setInitials] = useState(scoreService.getLastInitials());
  const [scores, setScores] = useState(scoreService.getScores());
  const [scoreSaved, setScoreSaved] = useState(false);
  const score = scoreService.calculateScore({
    rows: props.rows,
    columns: props.columns,
    attempts: props.attempts,
    timeUsed: props.timeUsed,
    resolved: props.resolved,
  });

  const onInitialsChange = (event) => {
    const nextInitials = event.target.value
      .replace(/[^a-z]/gi, "")
      .slice(0, 3)
      .toUpperCase();

    scoreService.setLastInitials(nextInitials);
    setInitials(nextInitials);
  };

  const onSaveScore = (event) => {
    event.preventDefault();

    if (initials.length !== 3 || scoreSaved) {
      return;
    }

    scoreService.addScore({
      initials,
      rows: props.rows,
      columns: props.columns,
      attempts: props.attempts,
      timeUsed: props.timeUsed,
      score,
    });
    setScores(scoreService.getScores());
    setScoreSaved(true);
  };

  return (
    <div className="finishCntnr">
      <span className="finishMsg">
        {props.resolved ? strings.finish.congrats : strings.finish.timeOut}
      </span>
      <img className="finishImg" src={finishImage} alt="finish" />
      {props.resolved && (
        <form className="scoreForm" onSubmit={onSaveScore}>
          <div className="scoreSummary">
            <div className="scorePreview">
              <span>{strings.finish.scoreToSave}</span>
              <strong>{score}</strong>
            </div>
            <span>{strings.finish.mode}: {props.rows}X{props.columns}</span>
            <span>{strings.finish.attempts}: {props.attempts}</span>
            <span>{strings.finish.time}: {props.timeUsed}s</span>
          </div>
          <label className="scoreLabel" htmlFor="initials">
            {strings.finish.enterInitials}
          </label>
          <div className="scoreInputCntnr">
            <input
              id="initials"
              className="scoreInput"
              value={initials}
              onChange={onInitialsChange}
              placeholder={strings.finish.initialsPlaceholder}
              maxLength="3"
              disabled={scoreSaved}
            />
            <button
              className="scoreButton"
              disabled={initials.length !== 3 || scoreSaved}
              type="submit"
            >
              {strings.finish.saveScore}
            </button>
          </div>
        </form>
      )}
      <div className="scoresCntnr">
        <p className="scoresTitle">{strings.finish.scoresTitle}</p>
        {scores.length === 0 && (
          <p className="scoresEmpty">{strings.finish.noScores}</p>
        )}
        {scores.length > 0 && (
          <table className="scoresTable">
            <thead>
              <tr>
                <th>{strings.finish.player}</th>
                <th>{strings.finish.mode}</th>
                <th>{strings.finish.score}</th>
                <th>{strings.finish.attempts}</th>
                <th>{strings.finish.time}</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((savedScore) => (
                <tr key={savedScore.id}>
                  <td>{savedScore.initials}</td>
                  <td>{savedScore.mode}</td>
                  <td>{savedScore.score}</td>
                  <td>{savedScore.attempts}</td>
                  <td>{savedScore.timeUsed}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
