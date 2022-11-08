import React, { useState } from "react";

import cardService from "../../services/card.service";
import Card from "../Card/Card";
import { showCardTime } from "../../config/config";
import "./CardBoard.css";

function CardBoard(props) {
  const rows = props.rows;
  const columns = props.columns;
  const [images] = useState(
    cardService.getImageArray(props.rows, props.columns)
  );
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentFlippedImage, setCurrentFlippedImage] = useState(undefined);
  const [hiddenImages, setHiddenImages] = useState([]);

  const onClickCard = (id, index) => {
    if (
      visibleImages.indexOf(index) < 0 &&
      hiddenImages.indexOf(index) < 0 &&
      visibleImages.length < 2
    ) {
      flipCard(id, index);
    }
  };

  const flipCard = (id, index) => {
    if (visibleImages.length === 1) {
      checkCardPair(id, index);
    } else {
      setCurrentFlippedImage(id);
    }
    const currentFlippedImages = visibleImages;
    currentFlippedImages.push(index);
    setVisibleImages(currentFlippedImages);
  };

  const checkCardPair = (id, index) => {
    props.onAttempt();
    if (currentFlippedImage === id) {
      onPairFound(index);
    } else {
      onPairNotFound();
    }
  };

  const onPairFound = (index) => {
    props.onPairFound();
    setTimeout(() => {
      const currentHiddenImages = hiddenImages;
      currentHiddenImages.push(index, visibleImages[0]);
      setHiddenImages(currentHiddenImages);
      setVisibleImages([]);
      if (hiddenImages.length === rows * columns) {
        props.onResolved();
      }
    }, showCardTime);
  };

  const onPairNotFound = () => {
    setTimeout(() => {
      setVisibleImages([]);
      setCurrentFlippedImage(0);
    }, showCardTime);
  };

  const getBoard = () => {
    const board = [];
    let count = 0;
    for (let i = 1; i <= rows; i++) {
      const row = [];
      for (let j = 1; j <= columns; j++) {
        const index = count;
        row.push(
          <Card
            key={index}
            id={images[index]}
            index={index}
            onClickCard={onClickCard}
            img={images[index]}
            visible={visibleImages.indexOf(index) < 0}
            hidden={hiddenImages.indexOf(index) < 0}
            rows={rows}
            columns={columns}
          ></Card>
        );
        count++;
      }
      board.push(
        <div key={i} className="row">
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="boardCntnr">
      <div>{getBoard()}</div>
    </div>
  );
}

export default CardBoard;
