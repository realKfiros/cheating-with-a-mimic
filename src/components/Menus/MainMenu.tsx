import React, {useContext, FC} from "react";
import {css} from "@emotion/react";
import MenuButton from "../menu_button";
import {AppContext} from "../../store";
import {menu} from "../../styles";
import Credits from "../modals/Credits";
import BettingAmount from "../modals/BettingAmount";

interface MainMenuProps
{
	onStart: () => void;
}

const MainMenu: FC<MainMenuProps> = ({onStart}) =>
{
	const {openDialog}: any = useContext(AppContext);

	return (
		<div css={menu}>
			<div className="title">Cheating with a Mimic</div>
			<MenuButton text="Start" onClick={() => onStart()} importance/>
			<MenuButton
				text="Credits"
				onClick={() => openDialog({title: "Credits", content: <Credits/>})}
				importance={false}
			/>
		</div>
	);
};

export default MainMenu;
