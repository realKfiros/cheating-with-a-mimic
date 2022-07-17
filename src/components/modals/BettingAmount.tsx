import React, {FC} from "react";
import { css } from "@emotion/react";

interface BettingAmountProps {
  onChange: (value:number)=>void;
}

const bettingAmountStyle = css`
  display: flex;
  justify-content: center;
  .betting-field {
    color: black;
    background: white;
    width: 35%;
  }
`;

const BettingAmount:FC<BettingAmountProps> = ({onChange}) => {
  return (
    <div css={bettingAmountStyle}>
      <input className="betting-field" name="Bet" type="number" autoFocus onChange={(e)=>{onChange(parseInt(e.target.value))}}/>
    </div>
  );
};

export default BettingAmount;
