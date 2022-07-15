import {useContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {observer} from "mobx-react-lite";
import MainMenu from './components/Menus/MainMenu';
import {AppContext, StoreProps} from "./store";
import {GameContext, GameStore} from './stores/game_store';
import GameView from './components/game_view';

const App = observer(() =>
{
	const store: any = useContext(AppContext);
	const {count}: any = store;

	return <div className="App">
		<div className="GameCanvas" style={{height:"100vh",width:"100vw"}}>
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
