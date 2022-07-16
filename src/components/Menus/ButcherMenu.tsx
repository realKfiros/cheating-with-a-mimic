import React, { useState } from "react";
import { css } from "@emotion/react";
import MenuButton from "../menu_button";
import { Stock } from "../list_item";

const styleButcherShop = css`
  display: flex;
  padding-left: 50px;

  .title {
    color: black;
    font-weight: bold;
    font-size: 64px;
  }

  .butcher_board {
  }
`;

const ButcherMenu = () => {
  const [stock, setStock] = useState<Stock[]>([]);
  // TODO: after "an hour" (or a day) it should refresh with new items

  const [cart, setCart] = useState<Stock[]>([]);
  // TODO: after clicking on the buy button it will increase the hunger meter

  return (
    <div css={styleButcherShop}>
      <div className="title">Welcome to Butcher’s</div>
      <div className="butcher_board"></div>
      <MenuButton text="Buy" onClick={() => console.log("bought that")} />
    </div>
  );
};

export default ButcherMenu;
