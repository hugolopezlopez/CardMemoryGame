import store from "../store/store";
import { setColumns, setRows } from "../store/actions";

import { images } from "../config/config";

class CardService {
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  setRowsAndColumns = (rows, columns) => {
    store.dispatch(setColumns(columns));
    store.dispatch(setRows(rows));
  };

  getRowsAndColumns = (level, windowWidth, windowHeight) => {
    let columns = level.columns;
    let rows = level.rows;
    if (level.rows !== level.columns) {
      if (windowWidth < windowHeight) {
        columns = level.rows;
        rows = level.columns;
      }
    }
    return { rows: rows, columns: columns };
  };

  getImageArray = (rows, columns) => {
    const totalCards = (rows * columns) / 2;
    let imagesArray = this.shuffleArray(images);
    imagesArray = imagesArray.slice(0, totalCards);
    imagesArray = this.shuffleArray(imagesArray.concat(imagesArray));
    return imagesArray;
  };

  getCardWidth = (windowWidth, columns) => {
    return (((windowWidth - 40) / columns) * 100) / windowWidth + "vw";
  };

  getMaxCardHeight = (windowHeight, rows) => {
    return (((windowHeight - 150) / rows) * 100) / windowHeight + "vh";
  };
}

const cardService = new CardService();

Object.freeze(cardService);

export default cardService;
