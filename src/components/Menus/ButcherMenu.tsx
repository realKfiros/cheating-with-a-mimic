import React, { FC, useContext, useEffect, useState } from "react";
import MenuButton from "../menu_button";
import { GameContext } from "../../stores/game_store";
import { meatItem } from "../../common";
import { menu, Spacer } from "../../styles";
import { css } from "@emotion/react";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

import { AppContext } from "../../store";
import { classNames, pick } from "../../utilities";
import { possibleStock } from "../../common";

const styleButcherMenu = css`
  ${menu}
  .vertical {
    display: flex;
    flex-direction: row;

    > * {
      flex: 1;
      margin: auto auto 0;
    }
  }
`;

interface ButcherMenu {
  goBack: () => void;
}

const ButcherMenu = ({ goBack }: ButcherMenu) => {
  const { buyMeatItems }: any = useContext(GameContext);

  // const [stock, setStock] = useState<Stock[]>(gameStore.meatItems);
  // TODO: after "an hour" (or a day) it should refresh with new items

  const [cart, setCart] = useState<number[]>([]);
  // TODO: after clicking on the buy button it will increase the hunger meter

  return (
    <div css={styleButcherMenu}>
      <div className="title">Welcome to Tony’s</div>
      <div className="vertical">
        <ButcherBoard cart={cart} setCart={setCart}/>
        <Spacer />
        <MenuButton
          importance
          text="Buy"
          onClick={() => buyMeatItems()}
        />
      </div>
    </div>
  );
};

interface ButcherBoardProps {
  cart: number[],
  setCart: React.Dispatch<React.SetStateAction<number[]>>
}

const styleButcherBoard = css`
  background-color: #d9d9d9;
  border-radius: 2px;
  max-width: 180px;

  > div {
    margin: 5px;
  }
`;
const ButcherBoard: FC<ButcherBoardProps> = observer((cart, setCart) => {
  const gameStore = useContext(GameContext);
  const [meatItems,setMeatItems] = useState([]);

  useEffect(() => {
    setMeatItems(gameStore.meatItems);
    console.log("ass")
  }, [gameStore.meatItems])
  
  return (
    <div css={styleButcherBoard}>
      {(meatItems as meatItem[]).map((o, index) => (
        <Item key={index} {...o} setCart={setCart} index={index} />
      ))}
    </div>
  );
});

const styleItem = ({ selected }: any) => css`
  background-color: ${selected ? "#4d4d4d" : "#F8F8F8"};
  display: flex;
  flex-direction: row;
  /* padding: 4px 5px; */
  justify-content: space-between;
  cursor: default;
  width: 90px;

  > * {
    flex: 1;
    margin: 1px;
  }

  /* img {
		width: 32px;
		height: 32px;
	} */

  .item-title,
  .item-price {
    margin: auto;
  }

  .item-title {
    font-size: 7px;
    text-align: start;
    line-height: 0.5rem;
    margin: auto;
    padding-left: 4px;
  }

  .item-price {
    font-size: 5px;
  }
`;

interface ButcherItem extends meatItem
{
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
}

const Item: FC<ButcherItem> = observer(({ name, price, image, setCart, index }) => {
  const {toggleMeatItem, selectedItems} = useContext(GameContext);

  return (
    <div css={styleItem({ selected: selectedItems.has(index) })} onClick={() => toggleMeatItem(index)}>
      <img src={image} />
      <span className="item-title">{name}</span>
      <span className="item-price">{price}$</span>
    </div>
  );
});

export default ButcherMenu;
