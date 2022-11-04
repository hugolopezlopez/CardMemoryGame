import { images } from "../config/config";

class Utils {
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  getImageArray = (rows, columns) => {
    const totalCards = rows * columns / 2;
    let imagesArray = this.shuffleArray(images);
    imagesArray =imagesArray.slice(0, totalCards);
    imagesArray = this.shuffleArray(imagesArray.concat(imagesArray));
    return imagesArray;
  };

}

const utils = new Utils();

Object.freeze(utils);

export default utils;
