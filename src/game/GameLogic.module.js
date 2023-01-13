import getNpcList from "./NPCs";
import GameAssets from "./GameAssets.module";
import BoardMaps from "./BoardMaps.module";

const GameLogic = (() => {
  const levelTotal = 6;
  const gameItems = GameAssets.generateAssetBanks("find");

  const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const shuffleItems = (array) => {
    return randomItem(array);
  };

  const requestGameItems = (array, numOfItems) =>
    [...new Array(numOfItems)].map(() => randomItem(array));

  const getLevelMap = (num) => GameAssets.getLevelMap(num);

  const requestLevelItems = (gameLevel) => {
    let itemCount;
    let itemProperty;
    let itemReference;

    switch (gameLevel) {
      case 1:
        itemProperty = "name";
        itemReference = "Big Mario";
        break;

      case 2:
        itemProperty = "name";
        itemReference = "Magikoopa";
        break;

      case 3:
        itemProperty = "name";
        itemReference = "Toad";
        break;

      case 4:
        itemProperty = "name";
        itemReference = "Big Boo";
        break;

      case 5:
        itemProperty = "name";
        itemReference = "Lemmy";
        break;

      case 6:
        itemProperty = "name";
        itemReference = "Mario";
        break;
    }

    itemCount = BoardMaps.requestItemMapCount(
      gameLevel,
      itemReference,
      itemProperty
    );

    // console.log(itemCount);

    return {
      count: itemCount ?? 1,
      group: itemReference,
      assets: gameItems.filter((item) => item.name.includes(itemReference)),
    };
  };

  const levelFactory = (num) => {
    if (typeof num !== "number" && num < 1 && num > levelTotal) return 1;

    return {
      map: getLevelMap(num),
      items: requestLevelItems(num),
      validator: BoardMaps.checkMapPosition,
    };
  };

  const applyPowerUp = () => {};
  const applyPenalty = () => {};
  const updateScore = () => {};
  const updateLevel = () => {};
  const gameResult = () => {};

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

  const npcList = [
    "Bowser",
    "Bowser Jr",
    "Peach",
    "Yoshi",
    "Wiggler",
    "Waddlewing",
    "Cooligan",
    "Bullet Bill",
    "Big Urchin",
    "Cheep Cheep",
    "Koopa",
  ];

  return {
    npcList,
    gameItems,
    levelTotal,
    levelFactory,
    requestGameItems,
    shuffleIndexOrder,
  };
})();

export default GameLogic;
