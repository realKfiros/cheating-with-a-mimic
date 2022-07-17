import { useContext, useEffect, useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { GameContext } from "../stores/game_store";
import { AppContext } from "../store";
import { css } from "@emotion/react";
import { Stage, TableStage } from "../common";
import gameBoard from "../assets/gameBoard2.png";
import playerHandUp from "../assets/Player-Hand-Up.png";
import playerHandDown from "../assets/Player-Hand-Down.png";
import dice1 from "../assets/Dice1.png";
import dice2 from "../assets/Dice2.png";
import dice3 from "../assets/Dice3.png";
import dice4 from "../assets/Dice4.png";
import dice5 from "../assets/Dice5.png";
import dice6 from "../assets/Dice6.png";
import streetPlayer from "../assets/streetPlayer.png";
import mainBackground from "../assets/Street-BackGround.png";
import rollies from "../assets/sounds/dice_rolling.wav";
import Meter from "../components/meters/Meter";

import BettingAmount from "./modals/BettingAmount";
import GameWinner from "./modals/GameWinner";
import { autorun, toJS } from "mobx";

enum DiceAnimStage {
  HIDDEN,
  SHOW_CUP_CONTENT,
  CUP_FLIP,
  SHOW_DICE,
}
interface GameViewProps {
  showButcher: () => void;
  backgroundLocation: number;
  setBackgroundLocation: (location: number) => void;
  pause: () => void;
}

export const GameView: FC<GameViewProps> = observer(
  ({ showButcher, backgroundLocation, setBackgroundLocation, pause }) => {
    var [playerLocation, setPlayerLocation] = useState(192);
    //   var [backgroundLocation, setBackgroundLocation] = useState(-384);
    const styleGameView = css`
      left: 0;
      .tableView {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .spriteObject {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

      .player {
        top: 15px;
        left: 104px;
        /* scale: calc(2em); */
        /* height: calc((100vh/216)); */
        /* width: auto; */
      }
      .gameBoard {
        z-index: -1;
      }

      .showCupContent {
        top: 50px;
        left: 150px;
      }
      .cupFlip {
        top: 50px;
        left: 150px;
      }
      .dieOne {
        top: 50px;
        left: 150px;
      }
      .dieTwo {
        top: 80px;
        left: 190px;
      }
      /* .BackgroundTexture {
      left: ${backgroundLocation}px;
    } */

      .streetPlayer {
        top: 120px;
        left: ${playerLocation}px;
      }

      .hungerBar {
        left: 320px;
        top: 65px;
      }
      .susBar {
        left: 350px;
        top: 65px;
      }
    `;
    const [diceAnimStage, setdiceAnimStage] = useState(DiceAnimStage.HIDDEN);
    const [diceFiles, setdiceFiles] = useState(["matos", "matos"]);
    //   const [tableStage, settableStage] = useState(TableStage.WAIT_NEXT_NPC);
    const [moveDirection, setMoveDirection] = useState("none");
    const store = useContext(AppContext);
    const gameStore = useContext(GameContext);

    useEffect(() => {
      console.log("new stage in useeffect ", gameStore.tableStage);

      if (gameStore.tableStage == TableStage.PLAYER_ROLLING) {
        console.log("playe rolling");
        startRoll();
      }

      console.log("new stage: ", gameStore.tableStage);
      if (gameStore.tableStage == TableStage.ASK_BET) {
        askBettingAmount();
        gameStore.setTableStage(TableStage.WAITING_BET);
      } else if (gameStore.tableStage == TableStage.NPC_ROLLING) {
        startRoll();
      } else if (gameStore.tableStage == TableStage.PLAYER_SHOW_RESULT) {
        setTimeout(() => {
          gameStore.setTableStage(TableStage.SHOW_WINNER);
        }, 2000);
      } else if (gameStore.tableStage == TableStage.SHOW_WINNER) {
        const npcSum = gameStore.npcDiceResult[0] + gameStore.npcDiceResult[1];
        const playerSum = gameStore.playerDiceResult[0] + gameStore.playerDiceResult[1];
        const didPlayerWin = playerSum > npcSum;
        const delta = gameStore.bettingAmount * 2;
        store.openDialog({
          title: didPlayerWin ? "Winner :)" : "Loser :(",
          content: <GameWinner didPlayerWin={didPlayerWin} moneyDelta={delta} />,
          onClose: () => {
            gameStore.setTableStage(TableStage.WAIT_NEXT_NPC);
            gameStore.handleGameResult();
          },
        });
      }
    }, [gameStore.tableStage]);

    useEffect(() => {
      document.addEventListener("keydown", (event) => {
        if (!event.repeat) keyDown(event.key);
      });
      document.addEventListener("keyup", (event) => {
        keyUp(event.key);
      });
      // autorun(() => {
      //   console.log("new stage: ", gameStore.tableStage);
      //   settableStage(gameStore.tableStage);
      //   if (gameStore.tableStage == TableStage.ASK_BET) {
      //     askBettingAmount();
      //     gameStore.setTableStage(TableStage.WAITING_BET);
      //   } else if (gameStore.tableStage == TableStage.NPC_ROLLING) {
      //     startRoll();
      //   } else if (gameStore.tableStage == TableStage.SHOW_WINNER) {
      //   }
      // });
      autorun(() => {
        // console.log(gameStore.npcDiceResult);
        let result = gameStore.npcDiceResult;
        console.log("result: ", result);
        setdiceFiles([getDiceFile(result[0]), getDiceFile(result[1])]);
      });
      autorun(() => {
        // console.log(gameStore.npcDiceResult);
        let result = gameStore.playerDiceResult;
        console.log("result: ", result);
        setdiceFiles([getDiceFile(result[0]), getDiceFile(result[1])]);
      });
    }, []);

    useEffect(() => {
      movePlayer();
    }, [playerLocation, moveDirection, backgroundLocation]);

    const askBettingAmount = () => {
      store.openDialog({
        title: "How much to bet?",
        content: (
          <BettingAmount
            onChange={(value: number) => {
              gameStore.bettingAmount = value;
            }}
          />
        ),
        onClose: () => {
          gameStore.tableStage = TableStage.NPC_WILL_ROLL;
        },
      });
    };

    const startRoll = () => {
      const audio = new Audio(rollies);
      setdiceAnimStage(DiceAnimStage.SHOW_CUP_CONTENT);
      audio.play();
      setTimeout(() => {
        setdiceAnimStage(DiceAnimStage.CUP_FLIP);
        setTimeout(() => {
          setdiceAnimStage(DiceAnimStage.SHOW_DICE);
          if (gameStore.tableStage == TableStage.NPC_ROLLING) {
            gameStore.setTableStage(TableStage.PLAYER_WAIT_INPUT);
          } else {
            gameStore.setTableStage(TableStage.PLAYER_SHOW_RESULT);
          }
        }, 1500);
      }, 1500);
    };

    const getDiceFile = (diceValue: number) => {
      // console.log("result: ",toJS(gameStore.npcDiceResult));
      switch (diceValue) {
        case 1:
          return dice1;
        case 2:
          return dice2;
        case 3:
          return dice3;
        case 4:
          return dice4;
        case 5:
          return dice5;
        case 6:
          return dice6;
        default:
          return "matos2";
      }
    };

    function onLeftClick() {
      console.log("stage from gamestore: ", gameStore.tableStage);
      // console.log("stage from state: ", tableStage);
      if (gameStore.tableStage == TableStage.PLAYER_WAIT_INPUT) {
        gameStore.shouldCheat = false;
        gameStore.tableStage = TableStage.PLAYER_WILL_ROLL;
      }
    }
    const onRightClick = () => {
      if (gameStore.tableStage == TableStage.PLAYER_WAIT_INPUT) {
        gameStore.shouldCheat = true;
        gameStore.tableStage = TableStage.PLAYER_WILL_ROLL;
      }
    };

    const movePlayer = () => {
      console.log("moving ", moveDirection);
      if (moveDirection == "none") {
        return;
      }
      if (moveDirection == "right") {
        setTimeout(() => {
          if (playerLocation < 280) {
            setPlayerLocation(playerLocation + 5);
          } else {
            if (backgroundLocation > -768) {
              setBackgroundLocation(backgroundLocation - 5);
            }
          }
        }, 20);
      }
      if (moveDirection == "left") {
        setTimeout(() => {
          if (playerLocation > 30) {
            setPlayerLocation(playerLocation - 5);
          } else {
            if (backgroundLocation < 0) {
              setBackgroundLocation(backgroundLocation + 5);
            }
          }
        }, 20);
      }
      if (moveDirection == "up") {
        tryEnter();
      }
      if (moveDirection == "down") {
        sitDown();
      }
    };

    const tryEnter = () => {
      let locationInStreet = playerLocation - backgroundLocation;
      console.log("location: ", locationInStreet);
      if (locationInStreet > 20 && locationInStreet < 70) {
        showButcher();
      }
    };

    const sitDown = () => {
      let locationInStreet = playerLocation - backgroundLocation;
      console.log("location: ", locationInStreet);
      if (locationInStreet > 571 && locationInStreet < 741) {
        gameStore.stage = Stage.TABLE;
        console.log("sit");
      }
    };
    const keyDown = (keyValue: string) => {
      switch (keyValue) {
        case "ArrowRight":
          console.log("right");
          setMoveDirection("right");
          break;

        case "ArrowLeft":
          console.log("left");
          setMoveDirection("left");
          break;

        case "ArrowUp":
          setMoveDirection("up");
          break;

        case "ArrowDown":
          setMoveDirection("down");
          break;

        case "Escape":
          pause();
          break;
      }
      if ((keyValue = "ArrowRight")) {
      }
    };

    const keyUp = (keyValue: string) => {
      setMoveDirection("none");
    };

    return (
      <div css={styleGameView}>
        {gameStore.stage == Stage.TABLE && (
          <div className="tableView" onClick={() => onLeftClick()} onContextMenu={onRightClick}>
            <img className="spriteObject gameBoard" src={gameBoard}></img>
            {/* <img className='spriteObject player' src={tablePlayerImage}></img> */}
            {
              diceAnimStage == DiceAnimStage.SHOW_CUP_CONTENT && (
                <img className="spriteObject showCupContent" src={playerHandUp}></img>
              )
              // <img className='spriteObject showCupContent' src={playerHandDown}></img>
              // <img className='spriteObject showCupContent' src={tablePlayerImage}></img>
            }

            {diceAnimStage == DiceAnimStage.CUP_FLIP && (
              <img className="spriteObject cupFlip" src={playerHandDown}></img>
            )}
            {diceAnimStage == DiceAnimStage.SHOW_DICE && (
              <>
                <img className="spriteObject dieOne" src={diceFiles[0]}></img>
                <img className="spriteObject dieTwo" src={diceFiles[1]}></img>
              </>
            )}

            <div className="diceView"></div>
            <div className="userInterface">
              <div className="exitToStreet"></div>
              <div className="moneySum"></div>

              {/* <div className='susMeter'></div> */}
              {/* <div className='cheatButton'></div> */}
            </div>
          </div>
        )}
        {gameStore.stage == Stage.STREET && (
          <div className="streetView" onKeyDown={(e) => console.log("ass")} tabIndex={0}>
            {/* <img className="spriteObject BackgroundTexture" src={mainBackground}></img> */}
            <div className="characters">
              <img className="spriteObject streetPlayer" src={streetPlayer}></img>
              <div className="NPCs"></div>
            </div>
            <div className="streetObjects">
              <div className="gametable"></div>
            </div>
          </div>
        )}
        <div className="spriteObject hungerBar">
          <Meter value={gameStore.hunger} label="🍖" />
        </div>
        <div className="spriteObject susBar">
          <Meter value={gameStore.suspicion} label="?" />
        </div>
      </div>
    );
  }
);
