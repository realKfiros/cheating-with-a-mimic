import React from 'react';
import { makeObservable, observable, action } from 'mobx';
import {Stage, randomNumber, randomDies} from '../common';

export const GameContext = React.createContext<any>(null);


interface GameStoreProps
{
    hunger: number;
    suspicion: number;
    money: number;
    running: boolean;
    stage: Stage;
    timeOfDay: number;
}

export class GameStore implements GameStoreProps
{
    @observable hunger = 0;
    @observable suspicion = 0;
    @observable money = 0;
    @observable running = true;
    @observable stage = Stage.TABLE;
    @observable timeOfDay = 0;

    constructor()
    {
        makeObservable(this);
    }
    
    throwDice = (isPlayer=false,lowestSum=0) =>
    {
        let diceResults = [0,0];
        if(!isPlayer) {
            diceResults = randomDies(0);
        } else{
            if(lowestSum > 0 && lowestSum != 12) {
                diceResults = randomDies(lowestSum);
            } else if(lowestSum === 12) {
                diceResults = [6,6];
            } else {
                diceResults = randomDies(0);
            }
        }
        return diceResults;

    }

    handleGameResult = (didCheat:boolean, didWin:boolean, moneyBetOn:number) => {
        if (didWin){
            // earn money
            this.money += moneyBetOn;
            console.log("win");
            if (didCheat)
                //handle sus meter and dies' hunger
                this.suspicion += 1;
                this.hunger -= 1;
                console.log("cheat");
            return true;
        }
        else{
            // lose money
            console.log("lose");
            this.money -= moneyBetOn;
            return true;
        }
    }

    suggestToCheat = () =>
    {
        //doStuff
        return true;
    }

    askBettingAmount = () =>
    {
        return 10;
    }

    @action
    gameLoop()
    {
        if(this.stage == Stage.TABLE) {
            const NPCResult = this.throwDice();//NPC throws dice - gets some number

            const shouldCheat = this.suggestToCheat();
            let NPCSum = 0;
            if(shouldCheat) {//Player decides whether to cheat or not
                NPCSum = NPCResult[0] + NPCResult[1];
            }
            //if you cheat - random from NPC result to highest number
            //if not cheat - random in full range
            const playerResult = this.throwDice(true,NPCSum);
            
            //if win - earn betting money
            //if cheated - do cheat stuff
            //if lose - lose betting money
            const didWin = (playerResult[0] + playerResult[1]) > NPCSum;
            this.handleGameResult(shouldCheat, didWin, this.askBettingAmount());

            //--goto start--
            
            //
        }
        else if (this.stage == Stage.STREET){

        }
        else if (this.stage == Stage.BUTCHER_SHOP){
            
        }
        else if (this.stage == Stage.UPGRADE_SHOP){
            
        }
        if (this.running)
            this.gameLoop();
    }
}