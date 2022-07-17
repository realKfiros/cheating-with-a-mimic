import React, { FC } from "react";
import { css } from "@emotion/react";
import {GameStore} from "../../stores/game_store";

interface BettingAmountProps {
  onChange: (value: number) => void;
  gameStore: GameStore;
}

const bettingAmountStyle = css`
  display: flex;
  justify-content: center;
  .betting-field {
    color: black;
    background: white;
    width: 150px;
    height: 35px;
    font-size: large;
    font-family: PixeliodSans;
  }
`;

const BettingAmount: FC<BettingAmountProps> = ({ onChange, gameStore }) => {
  return (
    <div css={bettingAmountStyle}>
      <input
        className="betting-field"
        name="Bet"
        type="number"
        autoFocus
        onChange={(e) => {
          if (!e.target.value) return;
          if (Number(e.target.value) <= 0) return;
          onChange(parseInt(e.target.value));
        }}
        min={0}
        max={gameStore.money}
      />
    </div>
  );
};

export default BettingAmount;
