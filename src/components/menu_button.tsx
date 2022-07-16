import {css} from "@emotion/react"

interface MenuButtonProps
{
	text: string;
	onClick: () => void;
}

const styleMenuButton = css`
	cursor: pointer;
	border: 4px solid black;
	border-radius: 28px;
	width: 230px;
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 40px;
	background-color: #D9D1A9;
	color: #0D0D0D;
	clip-path: polygon(
			0px 20px,
			4px 20px,
			4px 12px,
			8px 12px,
			8px 8px,
			12px 8px,
			12px 4px,
			16px 4px,
			20px 4px,
			20px 0px,
			calc(100% - 20px) 0px,
			calc(100% - 20px) 4px,
			calc(100% - 12px) 4px,
			calc(100% - 12px) 8px,
			calc(100% - 8px) 8px,
			calc(100% - 8px) 12px,
			calc(100% - 4px) 12px,
			calc(100% - 4px) 16px,
			calc(100% - 4px) 20px,
			100% 20px,
			100% calc(100% - 20px),
			calc(100% - 4px) calc(100% - 20px),
			calc(100% - 4px) calc(100% - 12px),
			calc(100% - 8px) calc(100% - 12px),
			calc(100% - 8px) calc(100% - 8px),
			calc(100% - 12px) calc(100% - 8px),
			calc(100% - 12px) calc(100% - 4px),
			calc(100% - 16px) calc(100% - 4px),
			calc(100% - 20px) calc(100% - 4px),
			calc(100% - 20px) 100%,
			20px 100%,
			20px calc(100% - 4px),
			12px calc(100% - 4px),
			12px calc(100% - 8px),
			8px calc(100% - 8px),
			8px calc(100% - 12px),
			4px calc(100% - 12px),
			4px calc(100% - 16px),
			4px calc(100% - 20px),
			0px calc(100% - 20px)
	);
	
	&:active {
		background-color: #A6A381;
	}
`;
const MenuButton = ({text, onClick}: MenuButtonProps) =>
{
	return <div css={styleMenuButton} onClick={onClick}>
		{text}
	</div>
}

export default MenuButton;