import React, { Fragment, useState, useRef } from "react";

import questionIcon from "../../assets/items/block_question.png";
import SuperstarCard from "./SuperstarCard";
import ImageMap from "../../game/ImageMap.module";
import LocatorBox from "./LocatorBox";

const Level = (props) => {
  const foundLocationRef = useRef();
  const [visible, setVisible] = useState(false);
  const [locatorBoxStyle, setLocatorBoxStyle] = useState([["init"], "hidden"]);

  const { checkMapPosition, calculateUserPosition } = ImageMap;

  const handleListItems = (boolean) => setVisible(boolean);

  const handleUserMapPosition = (e) => {
    const { levelData, foundPositions } = props;

    // validate position against backend level data
    const foundValidItem = checkMapPosition(levelData, e, foundPositions);

    if (!foundValidItem) {
      const { clickX, clickY } = calculateUserPosition(e);

      setLocatorBoxStyle([[clickY, clickX], "visible"]);
      handleListItems(false);

      foundLocationRef.current = "";
      return;
    }

    const itemRefGroup = foundValidItem.name.includes(
      props.levelTools.items.group
    );

    // found an item!
    if (itemRefGroup) {
      const { x, y, w, h } = foundValidItem;

      setLocatorBoxStyle([[y, x, w, h], "visible"]);
      handleListItems(true);

      foundLocationRef.current = foundValidItem;
      return;
    }
  };

  const invalidLocation = () => {
    console.log("Unluckly! Please try again...");

    setLocatorBoxStyle([["init"], "hidden"]);
    handleListItems(false);
  };

  const handleLocation = (e) => {
    if (!foundLocationRef.current) return invalidLocation(); // map

    const character = e.target.textContent;
    const charAtLoc = foundLocationRef.current.name;

    if (character === charAtLoc) {
      props.handleFoundItem(e.target.textContent, foundLocationRef.current);
    }

    foundLocationRef.current = "";

    setLocatorBoxStyle([["init"], "hidden"]);
    handleListItems(false);
  };

  return (
    <Fragment>
      <LocatorBox
        visible={visible}
        locatorStyle={locatorBoxStyle}
        handleLocation={handleLocation}
        characterList={props.characterList}
      />

      {props.foundItems.length
        ? props.foundItems.map((position, index) => (
            <SuperstarCard
              key={`KEY__locator-card-${index}`}
              style={{
                top: position.y + "px",
                left: position.x + "px",
                width: position.w + "px",
                height: position.h + "px",
              }}
            />
          ))
        : null}

      <img
        className="game-image"
        src={props.levelTools.map.uri}
        alt={props.levelTools.map.name}
        onClick={(e) => handleUserMapPosition(e)}
      />
    </Fragment>
  );
};

export default Level;
