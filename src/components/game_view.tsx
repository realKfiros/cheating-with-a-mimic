import {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {GameContext} from '../stores/game_store';
import {css} from '@emotion/react';
import { Stage } from '../common';
import tablePlayerImage from '../assets/tableplayer.png'

const styleGameView = css`
    left:0;
    .spriteObject {
        position: absolute;
    }

    .player {
        top:15px;
        left:104px;
        /* scale: calc(2em); */
        /* height: calc((100vh/216)); */
        /* width: auto; */
    }
`;
const GameView = observer(() =>
{
    const store = useContext(GameContext);

    useEffect(() =>
    {
    }, []);


    return <div css={styleGameView}>
        { store.stage == Stage.TABLE && <div className='tableView'>
            <img className='spriteObject player' src={tablePlayerImage}></img>
            <div className='spriteObject gametable'></div>
            <div className='diceView'></div>
            <div className='userInterface'>
                <div className='exitToStreet'></div>
                <div className='moneySum'></div>
                {/* <div className='hungerBar'></div> */}
                {/* <div className='susMeter'></div> */}
                {/* <div className='cheatButton'></div> */}
            </div>
            
            
        </div>}
        { store.stage == Stage.STREET && <div className='streetView'>
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