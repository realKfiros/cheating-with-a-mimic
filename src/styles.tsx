import {css} from "@emotion/react";

export const menu = css`
	display: flex;
	flex-direction: column;
	color: #0D0D0D;
	justify-content: center;
	align-items: center;

	> * {
		margin: 5px auto;
	}

	.title {
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 20px;
		line-height: 4rem;
	}
`;

export const Spacer = () => <div css={css`flex: 1 1 auto`}/>;