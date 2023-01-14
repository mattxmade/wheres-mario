import characters from "./characters";
import GameAssets from "./GameAssets.module";
import BoardMaps from "./BoardMaps.module";

import LevelBuilder from "./LevelBuilder.module";
import gameMessages from "./GameMessages";

const GameLogic = (() => {
  const shuffleIndexOrder = (array, stopper) => {
    const shuffledArray = [];
    let uniqueIndex = 0;

    const arrayIndexRandomiser = (array) => {
      return Math.floor(Math.random() * array.length);
    };

    while (uniqueIndex < stopper) {
      const newIndex = arrayIndexRandomiser(array);

      if (!shuffledArray.includes(newIndex)) {
        uniqueIndex++;
        shuffledArray.push(newIndex);
      }

      if (uniqueIndex === stopper) break;
    }

    return shuffledArray.map((val) => array[val]);
  };

  const levelTotal = 6;
  const npcList = characters;
  const { gameItems, levelFactory } = LevelBuilder;

  return {
    npcList,
    gameItems,
    levelTotal,
    levelFactory,
    gameMessages,
    shuffleIndexOrder,
  };
})();

export default GameLogic;
