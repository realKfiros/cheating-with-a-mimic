import { useContext, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { observer } from "mobx-react-lite";
import MainMenu from "./components/Menus/MainMenu";
import { AppContext, StoreProps } from "./store";
import { GameContext, GameStore } from "./stores/game_store";
import {GameView} from "./components/game_view";
import { Dialog } from "./components/dialog";
import ButcherMenu from "./components/Menus/ButcherMenu";
import PauseMenu from "./components/Menus/PauseMenu";
import mainBackground from "./assets/gameBoard2.png";
import { css } from "@emotion/react";

const App = observer(() => {
  const [ratio, setRatio] = useState(0);
  const size = useWindowSize();
  function useWindowSize() {
    useEffect(() => {
      function handleResize() {
        setRatio(window.innerHeight / 216);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  }

  const styleGameCanvas = css`
    height: 100vh;
    width: auto;
    display: flex;
    justify-content: center;
    aspect-ratio: 16 / 9;
    margin-left: auto;
    margin-right: auto;
    image-rendering: pixelated;
    vertical-align: middle;
    margin-top: auto;
    align-items: center;

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
		.ForegroundElements {
			position: absolute;
    		z-index: 1;
			width: 384px;
			height: 216px;
			/*top:0;*/
			/* transform: scale(calc(100vh/216)); */
			transform: scale(${ratio});
			align-items: left;
		}
	`;
	
  return (
    <div className="App">
      <div className="GameCanvas" css={styleGameCanvas}>
        <div className="BackgroundTexture"></div>
        <div className="ForegroundElements">
          {/* <MainMenu></MainMenu> */}
          {/* <ButcherMenu /> */}
          <GameContext.Provider value={new GameStore()}>
            <GameView></GameView>
          </GameContext.Provider>
        </div>
      </div>
      <Dialog />
    </div>
  );
});

export default App
