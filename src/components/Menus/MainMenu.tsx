import React, { useContext } from "react";
import { css } from "@emotion/react";
import MenuButton from "../menu_button";
import { AppContext } from "../../store";
import { menu } from "../../styles";
import Credits from "../modals/Credits";
import BettingAmount from "../modals/BettingAmount";

const MainMenu = () => {
  const { openDialog }: any = useContext(AppContext);

  return (
    <div css={menu}>
      <div className="title">Game Title Here</div>
      <MenuButton text="Start" onClick={() => window.alert("wow")} />
      <MenuButton text="Credits" onClick={() => openDialog("Credits", <Credits />)} />
    </div>
  );
};

export default MainMenu;
