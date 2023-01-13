import React, { Fragment, useState, useRef } from "react";

import questionIcon from "../../assets/items/block_question.png";
import SuperstarCard from "./SuperstarCard";
import useMap from "../hooks/useMap";

const Level = (props) => {
  const { checkMapPosition } = useMap();

  const listItemsRef = useRef();
  const [visible, setVisible] = useState(false);

  const locatorBoxRef = useRef();
  const foundLocationRef = useRef();

  const calculateUserPosition = (e) => {
    const { x, y } = e.target.parentNode.getBoundingClientRect();
    const { clientX, clientY, target } = e;

    const clickX = clientX + target.parentNode.scrollLeft - x;
    const clickY = clientY - y;

    return { clickX, clickY };
  };

  const handleListItems = (boolean) => {
    setVisible(boolean);
  };

  const handleUserMapPosition = (e) => {
    const { style } = locatorBoxRef.current;

    // validate position against backend level data
    const foundValidItem = checkMapPosition(
      props.levelData,
      e,
      props.foundPositions
    );

    if (
      foundValidItem &&
      foundValidItem.name.includes(props.levelTools.items.group)
    ) {
      const { x, y, w, h } = foundValidItem;

      style.top = y + "px";
      style.left = x + "px";
      style.width = w + "px";
      style.height = h + "px";

      style.visibility = "visible";
      handleListItems(true);

      //listItemsRef.current.style.visibility = "visible";
      foundLocationRef.current = foundValidItem;
      return;
    }

    const { clickX, clickY } = calculateUserPosition(e);

    style.top = clickY - 32 + "px";
    style.left = clickX - 32 + "px";
    style.width = "64px";
    style.height = "64px";

    style.visibility = "visible";
    handleListItems(false);

    //listItemsRef.current.style.visibility = "hidden";
    foundLocationRef.current = "";
  };

  const invalidLocation = () => {
    console.log("Unluckly! Please try again...");

    locatorBoxRef.current.style.visibility = "hidden";
    handleListItems(false);
  };

  const handleLocation = (e) => {
    if (!foundLocationRef.current) return invalidLocation();

    props.handleFoundItem(foundLocationRef.current);

    foundLocationRef.current = "";

    const { style } = e.target;
    style.width = "64px";
    style.height = "64px";

    style.visibility = "hidden";
    handleListItems(false);
    //listItemsRef.current.style.visibility = "hidden";
  };

  return (
    <Fragment>
      <div
        ref={locatorBoxRef}
        className="locator-box"
        style={{ visibility: "hidden" }}
        onClick={handleLocation}
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
            </ul>{" "}
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
