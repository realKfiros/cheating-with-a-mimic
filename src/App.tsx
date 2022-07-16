import {useContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {observer} from "mobx-react-lite";
import MainMenu from './components/Menus/MainMenu';
import {AppContext, StoreProps} from "./store";
import {GameContext, GameStore} from './stores/game_store';
import GameView from './components/game_view';
import mainBackground from './assets/main-background.png';
import { css } from "@emotion/react";


const App = observer(() =>
{
	const styleGameCanvas = css`
		height:100vh;
		width: auto;
		display: flex;
		justify-content: center;
		aspect-ratio: 16 / 9;
		margin-left: auto;
		margin-right: auto;
		image-rendering: pixelated;
		
		.BackgroundTexture {
			background-image: url(${mainBackground});
			height: 100%;
			width: auto;
			aspect-ratio: 16 / 9;
			margin-left: auto;
			margin-right: auto;
			background-repeat: no-repeat;
			position: absolute;
			background-size: contain;
			z-index:0;
		}
	`;
	
	const store: any = useContext(AppContext);
	const {count}: any = store;

	return <div className="App">
		<div className="GameCanvas" css={styleGameCanvas}>
			<div className="BackgroundTexture"></div>
			<div className="ForegroundElements">
				<MainMenu></MainMenu>
				<GameContext.Provider value={new GameStore()}>
				<GameView></GameView>
				</GameContext.Provider>
			</div>
		</div>
	</div>
});

export default App
