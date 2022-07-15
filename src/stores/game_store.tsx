import React from 'react';
import { makeObservable, observable, action } from 'mobx';
import {Stage} from '../consts';

export const GameContext = React.createContext<any>(null);


interface GameStoreProps
{
    hunger: number;
    suspicion: number;
    money: number;
    running: boolean;
    stage: Stage;
}

export class GameStore implements GameStoreProps
{
    @observable hunger = 0;
    @observable suspicion = 0;
    @observable money = 0;
    @observable running = true;
    @observable stage = Stage.TABLE;

    constructor()
    {
        makeObservable(this);
    }

    @action
    gameLoop()
    {
        
        if (this.running)
            this.gameLoop();
    }
}