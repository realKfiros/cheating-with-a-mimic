import React, { FC } from "react";
import { css } from "@emotion/react";

interface BettingAmountProps {
  onChange: (value: number) => void;
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

const BettingAmount: FC<BettingAmountProps> = ({ onChange }) => {
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
      />
    </div>
  );
};

export default BettingAmount;
