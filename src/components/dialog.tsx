import {css} from "@emotion/react";
import {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {AppContext, ButtonProps} from "../store";

const styleDialog = css`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 1000;

	.content {
		background-color: #fff;
		color: #0D0D0D;
		padding: 10px;
	}

	.header, .footer {
		padding: 10px
	}

	.title {
		font-size: 20px;
		margin: 0;
	}

	.body {
		padding: 10px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		text-align: start;
	}

	.footer {
		> button {
			margin: 0 5px;
		}
	}
`;
export const Dialog: FC = observer(() =>
{
	const {dialog}: any = useContext(AppContext);

	if (!dialog.show)
		return null;

	return <div css={styleDialog}>
		<div className="content">
			<div className="header">
				<span className="title">{dialog.title}</span>
			</div>
			<div className="body">{dialog.content}</div>
			<div className="footer">
				{dialog.buttons.map(({onClick, title}: ButtonProps, index: number) => <button key={'button-' + index} onClick={onClick}>{title}</button>)}
			</div>
		</div>
	</div>;
});