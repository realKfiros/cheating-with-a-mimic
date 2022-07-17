import React from 'react';
import { makeObservable, observable, action, computed, autorun, runInAction } from 'mobx';
import {Stage, TableStage, randomNumber, meatItem, BUTCHERY_TIMER, possibleStock} from '../common';
import {mainStoreInstance} from "../store";


export const GameContext = React.createContext<any>(null);



interface GameStoreProps
{
    hunger: number;
    suspicion: number;
    money: number;
    running: boolean;
    lost: boolean;
    stage: Stage;
    timeOfDay: number;
    tableStage: TableStage;
    npcDiceResult: number[];
    playerDiceResult: number[];
    bettingAmount: number;
    shouldCheat: boolean;
    butcheryTimer: number;
    meatItems: meatItem[];
    selectedItems: Set<number>;
}

export class GameStore implements GameStoreProps
{
    @observable hunger = 100;
    @observable suspicion = 0;
    @observable money = 100;
    @observable running = true;
    @observable lost = false;
    @observable stage = Stage.STREET;
    @observable timeOfDay = 0;

    @observable tableStage = TableStage.WAIT_NEXT_NPC;
    @observable npcDiceResult = [0, 0];
    @observable playerDiceResult = [0,0];
    @observable bettingAmount = 0;
    @observable shouldCheat = false;
    @observable butcheryTimer = 0;
    @observable meatItems = [
        {name: "null",price: 0,hunger_fulfillment: 0,image: "",},
        {name: "null",price: 0,hunger_fulfillment: 0,image: "",},
        {name: "null",price: 0,hunger_fulfillment: 0,image: "",}
    ];
    @observable selectedItems = new Set<number>();

    @observable npcLocations = [randomNumber(0, 800), randomNumber(0, 800),
                                randomNumber(0, 800), randomNumber(0, 800)];

    constructor()
    {
        makeObservable(this);
        
        
    }

    @action 
    startLoops = () => {
        this.gameLoop();
        this.butcheryLoop();
    }

    
    throwDice = (isPlayer=false,lowestSum=0) =>
    {
        console.log("throwing");
        let diceResults = [0,0];
        if(!isPlayer) {
            diceResults[0] = randomNumber(1, 6);
            diceResults[1] = randomNumber(1, 6);
        } else{
            if(lowestSum > 0 && lowestSum != 12) {
                let sum = 0;
                while (sum <= lowestSum) {
                    diceResults[0] = randomNumber(1, 6);
                    diceResults[1] = randomNumber(1, 6);
                    sum = diceResults[0] + diceResults[1];
                }
            } else if(lowestSum === 12) {
                diceResults = [6,6];
            } else {
                diceResults[0] = randomNumber(1, 6);
                diceResults[1] = randomNumber(1, 6);
            }
        }
        console.log(diceResults);
        return diceResults;

    }

    handleGameResult = () => {
        let npcSum = this.npcDiceResult[0] + this.npcDiceResult[1];
        let playerSum = this.playerDiceResult[0] + this.playerDiceResult[1];
        
        if (playerSum > npcSum){
            // earn money
            this.money += this.bettingAmount*2;
            if (this.shouldCheat)
                //handle sus meter
                this.suspicion += 5;
            return true;
        }
        else{
            // lose money
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
            this.lost = true;
        }
    }

    handleNPCMovement = () => {
        for (let i = 0; i < 2; i++){
            this.npcLocations[i] -= 0.1;
            if (this.npcLocations[i] < -40)
                this.npcLocations[i] = 1152;
        }
        for (let i = 2; i < 4; i++){
            this.npcLocations[i] += 0.1;
            if (this.npcLocations[i] > 1152){
                this.npcLocations[i] = 0;
            }
        }
    }

    @action.bound
    toggleMeatItem(index: number)
    {
        if (this.selectedItems.has(index))
            this.selectedItems.delete(index);
        else
            this.selectedItems.add(index);
    }

    @action
    buyMeatItems = () =>
    {
        const combinedPrice = [...this.selectedItems].reduce((sum, index) => sum + this.meatItems[index].price, 0);
        const combinedHunger = this.hunger + [...this.selectedItems].reduce((sum, index) => sum + this.meatItems[index].hunger_fulfillment, 0);
        if (combinedPrice > this.money)
            mainStoreInstance().openDialog({
                title: 'Can\'t buy items!',
                content: 'Not enough money :('
            } as any);
        else if (combinedHunger > 100)
            mainStoreInstance().openDialog({
                title: 'Can\'t buy items!',
                content: 'The dices aren\'t hungry'
            } as any);
        else
            this.selectedItems.forEach(index =>
            {
                let meatItem = this.meatItems[index];
                this.hunger += meatItem.hunger_fulfillment;
                this.money -= meatItem.price;
                this.meatItems = this.meatItems.filter(item => item !== meatItem);
                this.meatItems.push(this.getRandomStock());
            });
        this.selectedItems.clear();
    }

    getRandomStock = () => {
        return possibleStock[randomNumber(0,possibleStock.length-1)] as meatItem
    }

    @action
    setMeatItems = (meatItems:meatItem[]) => {
        this.meatItems = meatItems;
    }

    @action
    butcheryLoop = () =>
    {
        this.butcheryTimer -=1;
        if(this.butcheryTimer<=0)
        {
            this.butcheryTimer = BUTCHERY_TIMER;
            const items = [this.getRandomStock(),this.getRandomStock(),this.getRandomStock()];
            this.selectedItems.clear();
            console.log("new items: ",items);
            this.setMeatItems(items);
        }
        if (this.running)
        {
            setTimeout(() => this.butcheryLoop(), 1000);

        }
    }

    @action
    gameLoop()
    {
        if(this.stage == Stage.TABLE) {
            if(this.tableStage == TableStage.WAIT_NEXT_NPC) {
                //do logic to spawn next NPC
                this.tableStage = TableStage.ASK_BET;
            } else if (this.tableStage == TableStage.NPC_WILL_ROLL) {
                this.money -= this.bettingAmount;
                let res = this.throwDice(); //NPC throws dice - gets some number
                // this.npcDiceResult[0] = res[0];
                // this.npcDiceResult[1] = res[1];
                this.npcDiceResult = res;
                this.setTableStage(TableStage.NPC_ROLLING);
                console.log("NPC rolled ", this.npcDiceResult);
            } else if (this.tableStage == TableStage.PLAYER_WILL_ROLL) {
                let NPCSum = 0;
                if(this.shouldCheat) {
                    NPCSum = this.npcDiceResult[0] + this.npcDiceResult[1];
                }
                let res = this.throwDice(true,NPCSum); //NPC throws dice - gets some number
                // this.playerDiceResult[0] = res[0];
                // this.playerDiceResult[1] = res[1];
                this.playerDiceResult = res;
                // this.playerDiceResult = this.throwDice(true,NPCSum);
                this.setTableStage(TableStage.PLAYER_ROLLING);
                console.log("changed stage");
            }
            // } else if (this.tableStage == TableStage.SHOW_WINNER) {
            //     this.handleGameResult();
            // }
            
            //--goto start--
            
            //
        }
        else if (this.stage == Stage.STREET){
            this.handleNPCMovement();
            
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

    @action.bound
    setTableStage(stage:TableStage)
    {
        this.tableStage = stage;
    }

}