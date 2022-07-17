import { useContext, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { observer } from "mobx-react-lite";
import MainMenu from "./components/Menus/MainMenu";
import { AppContext, StoreProps } from "./store";
import { GameContext, GameStore } from "./stores/game_store";
import { GameView } from "./components/game_view";
import { Dialog } from "./components/dialog";
import ButcherMenu from "./components/Menus/ButcherMenu";
import PauseMenu from "./components/Menus/PauseMenu";
import mainBackground from "./assets/Street-BackGround.png";
import { css } from "@emotion/react";

const App = observer(() => {
  const [ratio, setRatio] = useState(0);
  const [currentPage, setCurrentPage] = useState("main_menu");
  const [backgroundLocation, setBackgroundLocation] = useState(-384);

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
    max-width: 100vw;
    display: flex;
    justify-content: center;
    aspect-ratio: 16 / 9;
    margin-left: auto;
    margin-right: auto;
    image-rendering: pixelated;
    vertical-align: middle;
    margin-top: auto;
    align-items: center;
    overflow: hidden;
    position: relative;

    .spriteObject {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .BackgroundTexture {
      /* height: 100%;
      width: auto;
      margin-left: auto;
      margin-right: auto;
      position: absolute;
      z-index: 0; */
      left: ${backgroundLocation}px;
    }

    .ForegroundElements,
    .backgroundTextureContainer {
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
        <div className="backgroundTextureContainer">
          <img className="spriteObject BackgroundTexture" src={mainBackground}></img>
        </div>
        <div className="ForegroundElements">
          {currentPage == "main_menu" && (
            <MainMenu
              onStart={() => {
                setCurrentPage("game_view");
              }}
            />
          )}
          <GameContext.Provider value={new GameStore()}>
            {currentPage == "butcher_menu" && (
              <ButcherMenu goBack={() => setCurrentPage("game_view")} />
            )}
            {currentPage == "game_view" && (
              <GameView
                setBackgroundLocation={(location) => setBackgroundLocation(location)}
                backgroundLocation={backgroundLocation}
                showButcher={() => {
                  setCurrentPage("butcher_menu");
                }}
                pause={() => setCurrentPage("pause_menu")}
              />
            )}
            {currentPage == "pause_menu" && (
              <PauseMenu
                goBack={() => setCurrentPage("game_view")}
                toMain={() => setCurrentPage("main_menu")}
              />
            )}
          </GameContext.Provider>
        </div>
      </div>
      <Dialog />
    </div>
  );
});

export default App;
