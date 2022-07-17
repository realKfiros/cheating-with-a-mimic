import React, {FC} from "react";
import {css} from "@emotion/react";

interface GameWinnerProps
{
	didPlayerWin: boolean;
	moneyDelta: number;
}

const GameWinnerStyle = css`
	display: flex;
	justify-content: center;
	color: black;
	background: white;

	.coinsText {
		color: #e4ce5e;
	}
`;

const GameWinner: FC<GameWinnerProps> = ({didPlayerWin, moneyDelta}) =>
{
	return (
		<div css={GameWinnerStyle}>
			{didPlayerWin &&
				<div>You won, and earned <span className="coinsText">${moneyDelta}</span>.</div>
			}
			{!didPlayerWin &&
				<div>Opponent won, and you lost <span className="coinsText">${moneyDelta}</span>.</div>
			}
		</div>
	);
};

export default GameWinner;
