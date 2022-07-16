import {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {GameContext} from '../stores/game_store';
import {css} from '@emotion/react';

const styleGameView = css`
    
    .player {
        
    }
`;
const GameView = observer(() =>
{
    const store = useContext(GameContext);

    return <div css={styleGameView}>
        <div className='tableView'>
            <div className='player'></div>
            <div className='gametable'></div>
            <div className='diceView'></div>
            
        </div>
        <div className='mapView'>
            <div className='characters'>
                <div className='player'></div>
                <div className='NPCs'>
                    
                </div>
            </div>
            <div className='worldObjects'>
                <div className='gametable'></div>
            </div>
        </div>
        
    </div>;
});

export default GameView;