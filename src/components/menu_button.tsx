import {css} from "@emotion/react";
import button from "../assets/buttons/button.png";
import button_hover from "../assets/buttons/button_hover.png";

interface MenuButtonProps
{
	text: string;
	importance: boolean;
	onClick: () => void;
}

const styleMenuButton = ({text, importance}: any) => css`
	font-family: ${importance ? "PixeliodSansBold" : "PixeliodSans"};
	cursor: pointer;
	width: 47px;
	height: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 7px;
	background-color: none;
	color: #0d0d0d;
	line-height: 0.5rem;
	background-image: url(${button});
	background-size: cover;

	&:active {
		background-image: url(${button_hover});
	}
`;
const MenuButton = ({text, onClick, importance}: MenuButtonProps) =>
{
	return (
		<div css={styleMenuButton({text, importance})} onClick={onClick}>
			{text}
		</div>
	);
};

export default MenuButton;
