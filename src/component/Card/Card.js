import React, { useState } from "react";

import companyLogo from "../../assets/images/nen_logo.png";
import "./Card.css";

function Card(props) {
  const [imageName] = useState(props.img);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const getWidth = () => {
    return (((windowWidth - 40) / props.columns) * 100) / windowWidth + "vw";
  };

  const getMaxHeight = () => {
    return (((windowHeight - 150) / props.rows) * 100) / windowHeight + "vh";
  };

  return (
    <div
      id={props.id}
      onClick={(event) => {
        props.onClickCard(event.currentTarget.id, props.index)
      }}
      className="cardCntnr"
    >
      <div
        className="card"
        style={{
          borderStyle: props.hidden ? "solid" : "hidden",
          transform: !props.visible ? "rotateY(180deg)" : "",
          width: getWidth(),
          height: getWidth(),
          maxWidth: getMaxHeight(),
          maxHeight: getMaxHeight(),
        }}
      >
        <div className="front">
          <img
            className="img"
            src={companyLogo}
            alt="card"
            style={{
              opacity: props.hidden ? 1 : 0,
            }}
          />
        </div>
        <div className="back">
          <img
            className="img"
            src={
              imageName &&
              require("../../assets/images/cards/" + imageName + ".png")
            }
            alt="card"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
