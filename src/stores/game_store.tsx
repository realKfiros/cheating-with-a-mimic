import React from 'react';
import { makeObservable, observable, action, computed, autorun, runInAction } from 'mobx';
import {Stage, TableStage, randomNumber, meatItem, BUTCHERY_TIMER, possibleStock, OFFICER_TIMER} from '../common';
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
    officerLocation: number;
    officerTimer: number;
    officerDirection: string;
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
    @observable _bettingAmount = 0;
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
    @observable officerLocation = randomNumber(0, 800);
    @observable officerTimer = 0;
    @observable officerDirection = "left";

    constructor()
    {
        makeObservable(this);
        
        
    }

    @action 
    startLoops = () => {
        this.gameLoop();
        this.butcheryLoop();
        this.officerLoop();
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
                this.hunger -= 10;
            } else if(lowestSum === 12) {
                diceResults = [6,6];
                this.hunger -= 10;
            } else {
                diceResults[0] = randomNumber(1, 6);
                diceResults[1] = randomNumber(1, 6);
            }
        }
        console.log(diceResults);
        if(isPlayer && this.shouldCheat) {
            const officerDist = Math.abs(this.officerLocation - 650);
            if(officerDist<300) {
                this.suspicion += (20 * ((300-officerDist)/300))
                console.log("adding to suspicion because of officer", (20 * ((100-officerDist)/100)))
            }
                 
            this.suspicion += 5;
        }
        return diceResults;

    }

    handleGameResult = () => {
        let npcSum = this.npcDiceResult[0] + this.npcDiceResult[1];
        let playerSum = this.playerDiceResult[0] + this.playerDiceResult[1];
        
        if (playerSum > npcSum){
            // earn money
            this.money += this.bettingAmount*2;
            if (this.shouldCheat){
                //handle sus meter
                // const officerDist = Math.abs(this.officerLocation - 600);
                // if(officerDist<100) {
                //     this.suspicion += (20 * ((100-officerDist)/100))
                // }
                 
                // this.suspicion += 5;
            }
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
        this.hunger -= 0.003;
        if (this.hunger < 0){
            console.log("you've ran out of hunger");
            this.running = false;
            this.lost = true;
        }
    }
    handleSus = () => {
        // this.hunger -= 0.003;
        if (this.suspicion >= 100){
            // console.log("you've nger");
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

    @action
    officerLoop = () => {
        console.log(this.officerLocation);
        if (this.officerDirection=="right"){
            this.officerLocation -= 0.2;
            if (this.officerLocation < -40)
                this.officerLocation = 1152;
        }
        if (this.officerDirection=="left"){
            this.officerLocation += 0.2;
            if (this.officerLocation > 1152){
                this.officerLocation = 0;
            }
        }
        this.officerTimer -=0.02;
        if(this.officerTimer<=0)
        {
            this.officerTimer = OFFICER_TIMER;
            const dir = randomNumber(0,1);
            if(dir == 0) {
                this.officerDirection = "left";
            } else {
                this.officerDirection = "right";
            }
        }
        if (this.running)
        {
            setTimeout(() => this.officerLoop(), 20);

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

    @computed
    get bettingAmount()
    {
        return this._bettingAmount;
    }

    set bettingAmount(bettingAmount)
    {
        if (bettingAmount > this.money)
            this._bettingAmount = this.money;
        else
            this._bettingAmount = bettingAmount;
    }

    @action
    gameLoop()
    {
        if(this.stage == Stage.TABLE) {
            if(this.tableStage == TableStage.WAIT_NEXT_NPC) {
                //do logic to spawn next NPC
                this.tableStage = TableStage.ASK_BET;
            } else if (this.tableStage == TableStage.NPC_WILL_ROLL) {
                if (this._bettingAmount < 0)
                    mainStoreInstance().openDialog({
                        title: 'Can\'t bet that amount',
                        content: 'You literally just bet our money!'
                    } as any);
                else
                {
                    this.money -= this._bettingAmount;
                    let res = this.throwDice(); //NPC throws dice - gets some number
                    this.npcDiceResult = res;
                    this.setTableStage(TableStage.NPC_ROLLING);
                    console.log("NPC rolled ", this.npcDiceResult);
                }
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
            
            
        }
        else if (this.stage == Stage.BUTCHER_SHOP){
            
        }
        else if (this.stage == Stage.UPGRADE_SHOP){
            
        }
        
        this.handleHunger();
        this.handleSus();
        this.handleNPCMovement();
        
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