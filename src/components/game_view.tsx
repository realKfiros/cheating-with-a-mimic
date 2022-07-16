import {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {GameContext} from '../stores/game_store';
import {AppContext} from '../store';
import {css} from '@emotion/react';
import { Stage, TableStage } from '../common';
import gameBoard from '../assets/gameBoard2.png';
import tablePlayerImage from '../assets/tableplayer.png'


const styleGameView = css`
    left:0;
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
    
`;
const GameView = observer(() =>
{
    const store = useContext(AppContext);
    const gameStore = useContext(GameContext);

    useEffect(() =>
    {
        gameStore.gameLoop();
    }, []);

    useEffect(() =>
    {
        if(gameStore.tableStage == TableStage.ASK_BET) {
            askBettingAmount()
            gameStore.tableStage = TableStage.WAITING_BET;
        } 
        else if (gameStore.tableStage == TableStage.NPC_SHOW_RESULT){

        }
        else if (gameStore.tableStage == TableStage.PLAYER_SHOW_RESULT){

        }
        else if (gameStore.tableStage == TableStage.SHOW_WINNER){
            
        }
    }, [gameStore.tableStage]);

    const askBettingAmount = ()=>
    {
        console.log("asking")
        store.openDialog("How much to bet?", <div>ass</div>)
    }

    return <div css={styleGameView}>
        { gameStore.stage == Stage.TABLE && <div className='tableView'>
            <img className='spriteObject gameBoard' src={gameBoard}></img>
            <img className='spriteObject player' src={tablePlayerImage}></img>
            
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

export default GameView;