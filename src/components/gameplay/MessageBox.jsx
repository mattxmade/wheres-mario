import React, { useState, useRef, useLayoutEffect, Fragment } from "react";
import superstarIcon from "../../assets/items/power_super star.png";

const MessageBox = (props) => {
  const messageBoxRef = useRef();

  useLayoutEffect(() => {
    if (messageBoxRef.current)
      messageBoxRef.current.style.visibility = "hidden";
  });

  return (
    <Fragment>
      <div>
        <img src={superstarIcon} alt="Mario Superstar icon" />
        <h2>{props.message}</h2>
      </div>
      {props.nextLevel ? (
        <button onClick={props.moveToNextLevel}>Next Level</button>
      ) : (
        <button
          onClick={(e) => {
            e.target.parentNode.style.visibility = "hidden";
          }}
        >
          Continue...
        </button>
      )}
    </Fragment>
  );
};

export default MessageBox;
