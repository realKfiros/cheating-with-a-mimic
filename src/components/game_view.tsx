import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {GameContext} from '../stores/game_store';
import {AppContext} from '../store';
import {css} from '@emotion/react';
import { Stage, TableStage } from '../common';
import gameBoard from '../assets/gameBoard2.png';
import playerHandUp from '../assets/Player-Hand-Up.png'
import playerHandDown from '../assets/Player-Hand-Down.png'
import dice1 from '../assets/Dice1.png'
import dice2 from '../assets/Dice2.png'
import dice3 from '../assets/Dice3.png'
import dice4 from '../assets/Dice4.png'
import dice5 from '../assets/Dice5.png'
import dice6 from '../assets/Dice6.png'
import BettingAmount from './modals/BettingAmount';
import {autorun, toJS} from 'mobx';

enum DiceAnimStage
{
    HIDDEN,
    SHOW_CUP_CONTENT,
    CUP_FLIP,
    SHOW_DICE,
};

const styleGameView = css`
    left:0;
    .tableView {
        position: absolute;
        width:100%;
        height:100%;
    }
    .spriteObject {
        position: absolute;
        top:0;
        left:0;
        z-index:2;
    }

    .player {
        top:15px;
        left:104px;
        /* scale: calc(2em); */
        /* height: calc((100vh/216)); */
        /* width: auto; */
    }
    .gameBoard {
        z-index:-1;
    }

    .showCupContent{
        top:50px;
        left:150px;
    }
    .cupFlip{
        top:50px;
        left:150px;
    }
    .dieOne{
        top:50px;
        left:150px;
    }
    .dieTwo{
        top:80px;
        left:190px;
    }
    
`;
export const GameView = observer(() =>
{
    const [diceAnimStage, setdiceAnimStage] = useState(DiceAnimStage.HIDDEN);
    const [diceFiles, setdiceFiles] = useState(["matos","matos"]);
    const [tableStage, settableStage] = useState(TableStage.WAIT_NEXT_NPC);
    const store = useContext(AppContext);
    const gameStore = useContext(GameContext);

    // useEffect(() =>
    // {
    //     gameStore.gameLoop();
    // }, []);

    useEffect(() =>
    {
        autorun(() =>
        {
            console.log("new stage: ",gameStore.tableStage);
            settableStage(gameStore.tableStage);
            if(gameStore.tableStage == TableStage.ASK_BET) {
                askBettingAmount();
                gameStore.setTableStage(TableStage.WAITING_BET);
            } 
            else if (gameStore.tableStage == TableStage.NPC_ROLLING){
                startRoll();
            }
            else if (gameStore.tableStage == TableStage.PLAYER_ROLLING){
                console.log("playe rolling");
                startRoll();
            }
            else if (gameStore.tableStage == TableStage.SHOW_WINNER){
                
            }
        });
        autorun(() =>
        {
            // console.log(gameStore.npcDiceResult);
            let result = gameStore.npcDiceResult;
            console.log("result: ",result);
            setdiceFiles([getDiceFile(result[0]),getDiceFile(result[1])]);
            
        });
        autorun(() =>
        {
            // console.log(gameStore.npcDiceResult);
            let result = gameStore.playerDiceResult;
            console.log("result: ",result);
            setdiceFiles([getDiceFile(result[0]),getDiceFile(result[1])]);
            
        });
    }, []);

    const askBettingAmount = ()=>
    {
        store.openDialog({title:"How much to bet?",
            content:<BettingAmount onChange={(value:number)=>{gameStore.bettingAmount = value;}}/>,
            onClose:()=>{gameStore.tableStage = TableStage.NPC_WILL_ROLL;}})
    }

    const startRoll = ()=> {
        setdiceAnimStage(DiceAnimStage.SHOW_CUP_CONTENT);
        setTimeout(() => {
            setdiceAnimStage(DiceAnimStage.CUP_FLIP);
            setTimeout(() => {
                setdiceAnimStage(DiceAnimStage.SHOW_DICE);
                gameStore.setTableStage(TableStage.PLAYER_WAIT_INPUT);
            }, 1500);
        }, 1500);
    }

    const getDiceFile = (diceValue:number)=> {

        // console.log("result: ",toJS(gameStore.npcDiceResult));
        switch(diceValue) {
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
    }

    const onLeftClick = () => {
        console.log("stage from gamestore: ", gameStore.tableStage)
        console.log("stage from state: ", tableStage)
        if (tableStage == TableStage.PLAYER_WAIT_INPUT){
            gameStore.shouldCheat = false;
            setTimeout(() => {
                gameStore.tableStage = TableStage.PLAYER_WILL_ROLL;
            }, 1000);
            
        }
    }
    const onRightClick = () => {
        if (tableStage == TableStage.PLAYER_WAIT_INPUT){
            gameStore.shouldCheat = true;
            gameStore.tableStage = TableStage.PLAYER_WILL_ROLL;
        }
    }

    return <div css={styleGameView}>
        { gameStore.stage == Stage.TABLE && <div className='tableView' onClick={()=>onLeftClick()} onContextMenu={onRightClick}>
            <img className='spriteObject gameBoard' src={gameBoard}></img>
            {/* <img className='spriteObject player' src={tablePlayerImage}></img> */}
            {diceAnimStage == DiceAnimStage.SHOW_CUP_CONTENT &&
            <img className='spriteObject showCupContent' src={playerHandUp}></img>
            // <img className='spriteObject showCupContent' src={playerHandDown}></img>
            // <img className='spriteObject showCupContent' src={tablePlayerImage}></img>

            }
            
            {diceAnimStage == DiceAnimStage.CUP_FLIP && <img className='spriteObject cupFlip' src={playerHandDown}></img>}
            {diceAnimStage == DiceAnimStage.SHOW_DICE && <>
            <img className='spriteObject dieOne' src={diceFiles[0]}></img>
            <img className='spriteObject dieTwo' src={diceFiles[1]}></img>
            </>
            }
            
            <div className='diceView'>
                
            </div>
            <div className='userInterface'>
                <div className='exitToStreet'></div>
                <div className='moneySum'></div>
                {/* <div className='hungerBar'></div> */}
                {/* <div className='susMeter'></div> */}
                {/* <div className='cheatButton'></div> */}
            </div>
            
            
        </div>}
        { gameStore.stage == Stage.STREET && <div className='streetView'>
            <div className='characters'>
                <div className='player'></div>
                <div className='NPCs'>
                    
                </div>
            </div>
            <div className='streetObjects'>
                <div className='gametable'></div>
            </div>
        </div>}
        
    </div>;
});
