import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import companyLogo from "../../assets/images/nen_logo.png";
import CardBoard from "../../component/CardBoard/CardBoard";
import { strings } from "../../assets/strings";
import Finish from "../../component/Finish/Finish";
import "./PlayScreen.css";

function PlayScreen(props) {
  const rows = props.rows;
  const columns = props.columns;
  const [gameStarted, setGameStarted] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [failure, setFailure] = useState(false);
  const [pairsLeft, setPairsLeft] = useState((rows * columns) / 2);
  const [attempts, setAttempts] = useState(0);
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (gameStarted) {
      if (count > 0) {
        setTimeout(() => {
          if (!resolved) {
            const newCount = count - 1;
            setCount(newCount);
          }
        }, 1000);
      } else {
        setFailure(true);
      }
    }
  }, [count, resolved, gameStarted]);

  const onResolved = () => {
    setResolved(true);
  };

  const onPairFound = () => {
    setPairsLeft(pairsLeft - 1);
  };

  const onAttempt = () => {
    setAttempts(attempts + 1);
  };

  const onReturnToLevelSelection = (rows, columns) => {
    props.handleNavigation("/");
  };

  const onStartGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  return (
    <div className="mainCntnr">
      {!gameStarted && (
        <div className="startBtnCntnr">
          <button onClick={() => onStartGame()} className="startButton">
            Start
          </button>
        </div>
      )}
      <div className="header">
        <button
          onClick={() => onReturnToLevelSelection()}
          className="backButton"
        >
          {strings.playScreen.back}
        </button>
        <div className="subtitle">
          {strings.playScreen.secondsLeft} {count}
        </div>
        <img className="logo" src={companyLogo} alt="Logo" />
      </div>
      {!resolved && !failure && (
        <CardBoard
          onResolved={() => onResolved()}
          onPairFound={() => onPairFound()}
          onAttempt={() => onAttempt()}
          rows={rows}
          columns={columns}
        ></CardBoard>
      )}
      {(resolved || failure) && (
        <Finish
          onReturnToLevelSelection={() => onReturnToLevelSelection()}
          resolved={resolved}
          failure={failure}
        ></Finish>
      )}
      <div className="footer">
        <div className="subtitle">
          {pairsLeft} {strings.playScreen.pairsLeft}
        </div>
        <div className="subtitle">
          {strings.playScreen.attempts} {attempts}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    columns: state.columns,
  };
};

export default connect(mapStateToProps)(PlayScreen);
