// @ts-ignore
export enum Stage
{
    TABLE,
    STREET,
    BUTCHER_SHOP,
    UPGRADE_SHOP,
};

export enum TableStage
{
    WAIT_NEXT_NPC,
    ASK_BET,
    WAITING_BET,
    NPC_WILL_ROLL,
    NPC_ROLLING,
    NPC_SHOW_RESULT,
    PLAYER_WAIT_INPUT,
    PLAYER_WILL_ROLL,
    PLAYER_ROLLING,
    PLAYER_SHOW_RESULT,
    SHOW_WINNER,
    WAIT_WINNER_DIALOG_CLOSE,
    
};

export const randomNumber = (start:number, end:number)=> {
    if(end<start) {
        console.error("End number smaller than start number")
    }
    let num = Math.floor(start + (Math.random() * (end-start)));
    console.log(num);
    return num;
}

export const randomDies = (minSum:number) => {
    let sum = 0;
    let diceResults = [0,0];
    while(sum<minSum) {
        diceResults[0] = randomNumber(1, 6);
        diceResults[1] = randomNumber(1, 6);
        sum = diceResults[0] + diceResults[1];
    }

    return diceResults;
}