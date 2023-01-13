import React, { useEffect, useState, useRef, Fragment } from "react";

import Level from "./Level";
import UserAside from "../0user/UserAside";

import Rhoc from "../hoc/Rhoc.module";
import useLevels from "../hooks/useLevels";

import GameLogic from "../../game/GameLogic.module";
import fetchGameData from "../../game/fetchGameData";

import AssetsFromDirectory from "../../assets/AssetsFromDirectory";
import superstarIcon from "../../assets/items/power_super star.png";
const heroTiles = AssetsFromDirectory("heroes--large");

const onSuccess = [
  "Great Job! You found ",
  "Excellent! You found ",
  "Awesome! You found ",
];

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

const Game = (props) => {
  const mainRef = useRef();
  const wheresMarioGame = GameLogic;
  const lastLevelNumber = wheresMarioGame.levelTotal;

  const [userScore, setUserScore] = useState(0);
  const [userLevel, setUserLevel] = useState(1);

  const [gameData, setGameData] = useState();
  const [levelData, setLevelData] = useState(null);

  const [foundItems, setFoundItems] = useState([]);
  const [remainingItems, setRemainingItems] = useState(0);

  const [userGameTime, setGameTime] = useState(0);
  const [userLevelTime, setLevelTime] = useState(0);
  const [resetShotclock, setResetShotclock] = useState(false);

  const levelTools = wheresMarioGame.levelFactory(userLevel);

  const pcList = useRef();
  const [choicList, setChoiceList] = useState([]);

  // could load gamedata at top then any level calls will hit cache
  useEffect(() => {
    fetchGameData(setGameData);
  }, []);

  useEffect(() => {
    if (gameData) handleNewLevel(userLevel);
  }, [gameData]);

  const handleNewLevel = (levelNumber) => {
    const level = getLevelData(levelNumber);

    setLevelData(level);

    setFoundItems([]);
    setRemainingItems(level.positions.length);

    handleSetChoiceList(level.positions);
  };

  const handleGameMessage = (name, type) => {
    const newMessage = onSuccess[Math.floor(Math.random() * onSuccess.length)];

    setGameMessage(newMessage + name + ".");
    popupRef.current.style.visibility = "visible";
  };

  const handleSetChoiceList = (array) => {
    if (!array) return;

    const nameList = [...new Array(array.length)].map(
      (item, index) => (item = array[index].name)
    );

    const uniqueNames = nameList.reduce(
      (prev, current, index, array) =>
        prev.name !== current.name && array(index)
    );

    const itemNameList = [array.find((item) => item.name).name];

    const { npcList } = wheresMarioGame;
    const shuffleNpcs = shuffleIndexOrder(npcList, npcList.length).filter(
      (item, index) => index < 6 - itemNameList.length
    );

    setChoiceList(shuffleIndexOrder([itemNameList, shuffleNpcs].flat(), 6));
  };

  const handleFoundItem = (foundItem) => {
    setFoundItems([...foundItems, foundItem]);

    handleRemaining();
    handleUserScore();
    handleResetShotclock();
  };

  const handleUserScore = () => {
    setUserScore((prevScore) => prevScore + 500);
  };

  const handleResetShotclock = () => {
    setResetShotclock(!resetShotclock);
  };

  const handleRemaining = () => {
    if (remainingItems > 1) setRemainingItems((prevCount) => prevCount - 1);
  };

  // if speedrun - keep like this // move to next level
  const isLevelComplete = () => {
    // foundPositions.length === levelTools.items.count && moveToNextLevel();

    const foundCharacterName = foundItems[foundItems.length - 1]?.name;

    if (!foundCharacterName) return;

    if (foundItems.length === levelData?.positions?.length) {
      // end of level
      //handleGameMessage(foundCharacterName, "success");
    }

    handleGameMessage(foundCharacterName, "success");
  };

  // useLevel | withLevel ???
  const getLevelData = (levelNum) =>
    gameData.find((level) => level.level === levelNum);

  const moveToNextLevel = () => {
    if (userLevel === 6) return;
    if (foundItems.length !== levelData?.positions?.length) return;

    popupRef.current.style.visibility = "hidden";

    const progressToLevel = userLevel + 1;

    setUserLevel(progressToLevel);
    handleNewLevel(progressToLevel);
    resetGameSystems();
  };

  const resetGameSystems = () => {
    if (!levelData) return;

    const remaining = remainingItems;
    const positions = levelData.positions.length;

    if (remaining === 1 && remaining !== positions) {
      setRemainingItems(positions);
    }
  };

  useEffect(isLevelComplete, [foundItems]);

  const popupRef = useRef();
  const [gameMessage, setGameMessage] = useState("");

  if (!levelTools) return;

  return (
    <Fragment>
      <main ref={mainRef} className="map">
        <div ref={popupRef} className="game-message-popup">
          <div>
            <img src={superstarIcon} alt="Mario Superstar icon" />
            <h2>{gameMessage}</h2>
          </div>

          {foundItems.length === levelData?.positions?.length ? (
            <button onClick={() => moveToNextLevel()}>Next Level</button>
          ) : (
            <button
              onClick={(e) => {
                e.target.parentNode.style.visibility = "hidden";
              }}
            >
              Continue...
            </button>
          )}
        </div>

        <Level
          level={userLevel}
          levelData={levelData}
          levelTools={levelTools}
          foundItems={foundItems}
          characterList={choicList}
          remainingItems={remainingItems}
          handleFoundItem={handleFoundItem}
        />
      </main>

      <aside>
        <UserAside
          heroTiles={heroTiles}
          toFind={remainingItems}
          userLevel={userLevel}
          userScore={userScore}
          userCharacter={props.userCharacter}
          assets={levelTools.items.assets}
        />
      </aside>
    </Fragment>
  );
};

export default Game;
