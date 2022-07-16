// @ts-ignore
export enum Stage
{
    TABLE,
    STREET,
    BUTCHER_SHOP,
    UPGRADE_SHOP,
};

export const randomNumber = (start:number, end:number)=> {
    if(end<start) {
        console.error("End number smaller than start number")
    }
    return Math.floor(start + (Math.random() * (end-start)));
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