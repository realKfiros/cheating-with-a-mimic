import React from "react";
import { css } from "@emotion/react";

const bettingAmountStyle = css`
  display: flex;
  justify-content: center;
  .betting-field {
    color: black;
    background: white;
    width: 35%;
  }
`;

const BettingAmount = () => {
  return (
    <div css={bettingAmountStyle}>
      <input className="betting-field" name="Bet" type="number" />
    </div>
  );
};

export default BettingAmount;
