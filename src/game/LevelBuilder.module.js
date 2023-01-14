import BoardMaps from "./BoardMaps.module";
import GameAssets from "./GameAssets.module";

const LevelBuilder = (() => {
  const gameItems = GameAssets.generateAssetBanks("find");
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

  return { levelFactory };
})();

export default LevelBuilder;
