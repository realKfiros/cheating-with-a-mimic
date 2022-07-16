import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { observer } from "mobx-react-lite";
import MainMenu from "./components/Menus/MainMenu";
import { AppContext, StoreProps } from "./store";
import { GameContext, GameStore } from "./stores/game_store";
import GameView from "./components/game_view";
import {Dialog} from "./components/dialog";
import ButcherMenu from "./components/Menus/ButcherMenu";
import PauseMenu from "./components/Menus/PauseMenu";

const App = observer(() => {
  return (
    <div className="App">
      <div className="GameCanvas" style={{ height: "100%", width: "100%" }}>
        <div className="BackgroundTexture"></div>
        <div className="ForegroundElements">
          {/*<MainMenu />*/}
          {/*<ButcherMenu />*/}
          <PauseMenu />
          <GameContext.Provider value={new GameStore()}>
            <GameView />
          </GameContext.Provider>
        </div>
      </div>
		<Dialog />
    </div>
  );
});

export default App;
