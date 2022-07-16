import React from 'react';
import { makeObservable, observable, action } from 'mobx';
import {Stage, TableStage, randomNumber, randomDies} from '../common';

export const GameContext = React.createContext<any>(null);


interface GameStoreProps
{
    hunger: number;
    suspicion: number;
    money: number;
    running: boolean;
    stage: Stage;
    timeOfDay: number;
    tableStage: TableStage;
    npcDiceResult: number[];
    playerDiceResult: number[];
    bettingAmount: number;
    shouldCheat: boolean;
}

export class GameStore implements GameStoreProps
{
    @observable hunger = 100;
    @observable suspicion = 0;
    @observable money = 100;
    @observable running = true;
    @observable stage = Stage.TABLE;
    @observable timeOfDay = 0;

    @observable tableStage = TableStage.WAIT_NEXT_NPC;
    @observable npcDiceResult = [0,0];
    @observable playerDiceResult = [0,0];
    @observable bettingAmount = 0;
    @observable shouldCheat = false;



    constructor()
    {
        makeObservable(this);
    }
    
    throwDice = (isPlayer=false,lowestSum=0) =>
    {
        console.log("throwing");
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
                //handle sus meter
                this.suspicion += 1;
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
        return window.confirm("would you like to cheat?");
    }

    askBettingAmount = () =>
    {
        let value = "";
        do{
            value = window.prompt("how much would you like to bet") as string;
        }
        while (parseInt(value, 10) > this.money)
        return parseInt(value);
    }

    handleHunger = () => {
        this.hunger -= 0.001;
        if (this.hunger < 0){
            console.log("you've ran out of hunger");
            this.running = false;
        }
    }

    @action
    gameLoop()
    {
        if(this.stage == Stage.TABLE) {
            if(this.tableStage == TableStage.WAIT_NEXT_NPC) {
                //do logic to spawn next NPC
                this.tableStage = TableStage.ASK_BET;
            } else if (this.tableStage == TableStage.ASK_BET) {
                // this.bettingAmount = this.askBettingAmount()
                // this.tableStage = TableStage.NPC_WILL_ROLL;
            }
            else if (this.tableStage == TableStage.NPC_WILL_ROLL) {
                this.npcDiceResult = this.throwDice(); //NPC throws dice - gets some number
                this.tableStage = TableStage.NPC_ROLLING
            } else if (this.tableStage == TableStage.NPC_ROLLING) {
                this.tableStage = TableStage.NPC_SHOW_RESULT
            } else if (this.tableStage == TableStage.NPC_SHOW_RESULT) {
                window.alert("NPC DICE: "+this.npcDiceResult[0] +", "+ this.npcDiceResult[1]);
                this.tableStage = TableStage.PLAYER_WAIT_INPUT;
            } else if (this.tableStage == TableStage.PLAYER_WAIT_INPUT) {
                this.shouldCheat = this.suggestToCheat();
                this.tableStage = TableStage.PLAYER_WILL_ROLL;
            } else if (this.tableStage == TableStage.PLAYER_WILL_ROLL) {
                let NPCSum = 0;
                if(this.shouldCheat) {
                    NPCSum = this.npcDiceResult[0] + this.npcDiceResult[1];
                }
                this.playerDiceResult = this.throwDice(true,NPCSum);
                this.tableStage = TableStage.PLAYER_ROLLING;
            } else if (this.tableStage == TableStage.PLAYER_ROLLING) {
                this.tableStage = TableStage.PLAYER_SHOW_RESULT;
            } else if (this.tableStage == TableStage.PLAYER_SHOW_RESULT) {
                window.alert("PLAYER DICE: "+this.playerDiceResult[0] +", "+ this.playerDiceResult[1]);
                this.tableStage = TableStage.SHOW_WINNER;
            } else if (this.tableStage == TableStage.SHOW_WINNER) {
                let npcSum = this.npcDiceResult[0] + this.npcDiceResult[1];
                let playerSum = this.playerDiceResult[0] + this.playerDiceResult[1];

                
                if(playerSum > npcSum) {
                    window.alert("You won");
                } else if (playerSum < npcSum) {
                    window.alert("You lost");
                } else {
                    window.alert("Its a tie");
                }
                this.handleGameResult(this.shouldCheat, playerSum > npcSum, this.bettingAmount);

                this.tableStage = TableStage.WAIT_NEXT_NPC;
            } else if (this.tableStage == TableStage.WAIT_WINNER_DIALOG_CLOSE) {

            }
            
            //--goto start--
            
            //
        }
        else if (this.stage == Stage.STREET){
            
        }
        else if (this.stage == Stage.BUTCHER_SHOP){
            
        }
        else if (this.stage == Stage.UPGRADE_SHOP){
            
        }

        this.handleHunger();
        
        if (this.running) {
            setTimeout(() => {
                this.gameLoop();
            }, 0);

        }
    }
}