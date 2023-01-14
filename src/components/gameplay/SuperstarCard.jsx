import React from "react";
import superstarIcon from "../../assets/items/power_super star.png";

const SuperstarCard = (props) => {
  return (
    <div className="locator-card" style={props.style}>
      <img src={superstarIcon} alt="Mario Superstar icon" />
    </div>
  );
};

export default SuperstarCard;
