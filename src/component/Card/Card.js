import React, { useState } from "react";

import { flipCardTime } from "../../config/config";
import cardService from "../../services/card.service";
import companyLogo from "../../assets/images/nen_logo.png";
import "./Card.css";

function Card(props) {
  const [imageName] = useState(props.img);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

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
          transition: "all " + flipCardTime + "s linear",
          width: cardService.getCardWidth(windowWidth, props.columns),
          height: cardService.getCardWidth(windowWidth, props.columns),
          maxWidth: cardService.getMaxCardHeight(windowHeight, props.rows),
          maxHeight: cardService.getMaxCardHeight(windowHeight, props.rows),
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
