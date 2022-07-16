import {css} from "@emotion/react";

export const menu = css`
	display: flex;
	flex-direction: column;
	color: #0D0D0D;
	justify-content: center;
	align-items: center;

	> * {
		margin: 25px auto;
	}

	.title {
		font-size: 64px;
		margin-bottom: 100px;
		line-height: 4rem;
	}
`;

export const Spacer = () => <div css={css`flex: 1 1 auto`}/>;