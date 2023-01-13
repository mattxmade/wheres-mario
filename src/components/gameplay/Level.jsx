import React, { Fragment, useState, useRef } from "react";

import questionIcon from "../../assets/items/block_question.png";
import SuperstarCard from "./SuperstarCard";
import ImageMap from "../../game/ImageMap.module";

const Level = (props) => {
  const { checkMapPosition, calculateUserPosition } = ImageMap;

  const listItemsRef = useRef();
  const [visible, setVisible] = useState(false);

  const locatorBoxRef = useRef();
  const foundLocationRef = useRef();

  const handleListItems = (boolean) => {
    setVisible(boolean);
  };

  const handleUserMapPosition = (e) => {
    const { style } = locatorBoxRef.current;
    const { levelData, foundPositions } = props;

    // validate position against backend level data
    const foundValidItem = checkMapPosition(levelData, e, foundPositions);

    if (!foundValidItem) {
      const { clickX, clickY } = calculateUserPosition(e);

      style.top = clickY - 32 + "px";
      style.left = clickX - 32 + "px";
      style.width = "64px";
      style.height = "64px";

      style.visibility = "visible";
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

      style.top = y + "px";
      style.left = x + "px";
      style.width = w + "px";
      style.height = h + "px";

      style.visibility = "visible";
      handleListItems(true);

      foundLocationRef.current = foundValidItem;
      return;
    }
  };

  const invalidLocation = () => {
    console.log("Unluckly! Please try again...");

    locatorBoxRef.current.style.visibility = "hidden";
    handleListItems(false);
  };

  const handleLocation = (e) => {
    if (!foundLocationRef.current) return invalidLocation();

    const character = e.target.textContent;
    const charAtLoc = foundLocationRef.current.name;

    if (character === charAtLoc) {
      props.handleFoundItem(e.target.textContent, foundLocationRef.current);
    }

    foundLocationRef.current = "";

    const { style } = locatorBoxRef.current;
    style.width = "64px";
    style.height = "64px";

    style.visibility = "hidden";
    handleListItems(false);
  };

  return (
    <Fragment>
      <div
        ref={locatorBoxRef}
        className="locator-box"
        style={{ visibility: "hidden" }}
      >
        {visible ? (
          <div className="locator-box__popup-container">
            <img src={questionIcon} alt="Mario question icon" />
            <ul className="locator-box__popup-name-list" ref={listItemsRef}>
              {props.characterList?.map((charName, index) => (
                <li key={index} onClick={handleLocation}>
                  <p>{charName}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

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
