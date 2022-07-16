import React from "react";
import { css } from "@emotion/react";
import MenuButton from "../menu_button";

const stylePauseMenu = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin: 25px auto;
  }

  .title {
    color: black;
    font-weight: bold;
    font-size: 64px;
  }
`;

const PauseMenu = () => {
  return (
    <div css={stylePauseMenu}>
      <div className="title">Game Paused</div>
      <MenuButton text="Continue" onClick={() => console.log("continue")} />
      <MenuButton text="Back to Main Menu" onClick={() => console.log("quit")} />
    </div>
  );
};

export default PauseMenu;
