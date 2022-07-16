import React, {useContext} from 'react';
import {css} from "@emotion/react";
import MenuButton from '../menu_button';
import {AppContext} from "../../store";

const styleMainMenu = css`
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
	}
`;

const MainMenu = () =>
{
	const {openDialog}: any = useContext(AppContext);

	return <div css={styleMainMenu}>
		<div className="title">Game Title Here</div>
		<MenuButton text="Start" onClick={() => window.alert('wow')}/>
		<MenuButton text="Credits" onClick={() => openDialog('Credits', <ul>
			<li>Normandeeznuts</li>
			<li>@realKfiros</li>
			<li>matos</li>
		</ul>)}/>
	</div>;
}

export default MainMenu;