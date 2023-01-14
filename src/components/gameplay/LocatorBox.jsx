import React, { useRef } from "react";
import questionIcon from "../../assets/items/block_question.png";

const LocatorBox = (props) => {
  const locatorBoxRef = useRef();
  const [properties, isVisible] = props.locatorStyle;

  const style = {};
  switch (properties.length) {
    case 1:
      style.width = "64px";
      style.height = "64px";
      style.visibility = "hidden";
      break;

    case 2:
      const [clickY, clickX] = properties;

      style.top = clickY - 32 + "px";
      style.left = clickX - 32 + "px";
      style.width = "64px";
      style.height = "64px";
      style.visibility = "visible";
      break;

    case 4:
      const [y, x, w, h] = properties;

      style.top = y + "px";
      style.left = x + "px";
      style.width = w + "px";
      style.height = h + "px";
      style.visibility = "visible";
      break;
  }

  return (
    <div ref={locatorBoxRef} className="locator-box" style={style}>
      {props.visible ? (
        <div className="locator-box__popup-container">
          <img src={questionIcon} alt="Mario question icon" />

          <ul className="locator-box__popup-name-list">
            {props.characterList?.map((name, index) => (
              <li key={index} onClick={props.handleLocation}>
                <p>{name}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default LocatorBox;
