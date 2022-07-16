import React from "react";
import MenuButton from "../menu_button";
import {menu} from "../../styles";

const PauseMenu = () => {
  return (
    <div css={menu}>
      <div className="title">Game Paused</div>
      <MenuButton text="Continue" onClick={() => console.log("continue")} />
      <MenuButton text="Back to Main Menu" onClick={() => console.log("quit")} />
    </div>
  );
};

export default PauseMenu;
