import MenuButton from "../menu_button";
import {menu} from "../../styles";

interface PauseProp
{
	goBack: () => void;
	toMain: () => void;
}

const PauseMenu = ({goBack, toMain}: PauseProp) =>
{
	return (
		<div css={menu}>
			<div className="title">Game Paused</div>
			<MenuButton text="Continue" onClick={() => goBack()} importance/>
			<MenuButton text="Back to Main Menu" onClick={() => toMain()} importance={false}/>
		</div>
	);
};

export default PauseMenu;
