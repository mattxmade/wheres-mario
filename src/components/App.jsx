import React, { useState } from "react";

import "./App.css";
import Game from "./gameplay/Game";
import UserNav from "./core/UserNav";
import isTouchDevice from "../utility/isTouchDevice";
import CharacterSelect from "./routes/CharacterSelect";
import AssetsFromDirectory from "../assets/AssetsFromDirectory";

const heroTiles = AssetsFromDirectory("heroes--large");
const rivalTiles = AssetsFromDirectory("rivals--large");

// countdown timer
// correct item resets clock
// clock runs out > game over

const App = () => {
  const [userCharacter, setUserCharacter] = useState();

  const handleCharacterSelect = (object) => {
    const characterScreen = document.querySelector(".character-select");
    characterScreen.classList.add("animation--close-character-select-screen");

    setUserCharacter(object);
  };

  return (
    <div className="App">
      <header />

      <div className="wrapper">
        <CharacterSelect
          characterList={[heroTiles, rivalTiles]}
          handleCharacterSelect={handleCharacterSelect}
        />

        <Game userCharacter={userCharacter} />

        <UserNav />
      </div>

      <footer />
    </div>
  );
};

export default App;
