// @ts-ignore
import groundBeef from "./assets/meats/Ground Beef 2.png";
import kidney from "./assets/meats/Kidney 32x32.png";
import liver from "./assets/meats/Liver 32x32.png";
import heart from "./assets/meats/heart 32x32.png";
import tongue from "./assets/meats/tongue 32x32.png";
import shortRibs from "./assets/meats/short ribs 32x32.png";
import flank from "./assets/meats/Flank steak 32x32.png";
import ribeye from "./assets/meats/Ribeye 32x32.png";
import sirloin from "./assets/meats/Sirloin steak 32x32.png";
import strip from "./assets/meats/Strip steak 32x32.png";
import tBone from "./assets/meats/TBone steake 32x32.png";
import trimmedBrisket from "./assets/meats/Trimmed brisket 32x32.png";
import tenderloin from "./assets/meats/tenderloin 32x32.png";

export const BUTCHERY_TIMER = 60;
export const OFFICER_TIMER = 30;

export enum Stage {
  TABLE,
  STREET,
  BUTCHER_SHOP,
  UPGRADE_SHOP,
}

export enum TableStage
{
    NO_GAME,
    WAIT_NEXT_NPC,
    ASK_BET,
    WAITING_BET,
    NPC_WILL_ROLL,
    NPC_ROLLING,
    PLAYER_WAIT_INPUT,
    PLAYER_WILL_ROLL,
    PLAYER_ROLLING,
    PLAYER_SHOW_RESULT,
    SHOW_WINNER,
    
};

export interface meatItem {
    name: string,
    price: number,
    hunger_fulfillment: number,
    image: string
}

export const possibleStock = [
  {
    name: "Kidney",
    price: 2,
    hunger_fulfillment: 10.5,
    image: kidney,
  },
  {
    name: "Liver",
    price: 3,
    hunger_fulfillment: 10.7,
    image: liver,
  },
  {
    name: "Heart",
    price: 4,
    hunger_fulfillment: 10.8,
    image: heart,
  },
  {
    name: "Ground Beef",
    price: 5,
    hunger_fulfillment: 11.4,
    image: groundBeef,
  },
  {
    name: "Tongue",
    price: 7,
    hunger_fulfillment: 11.7,
    image: tongue,
  },
  {
    name: "Short Ribs",
    price: 9,
    hunger_fulfillment: 12.1,
    image: shortRibs,
  },
  {
    name: "Sirloin Steak",
    price: 11,
    hunger_fulfillment: 12.4,
    image: sirloin,
  },
  {
    name: "Flank Steak",
    price: 12,
    hunger_fulfillment: 13.1,
    image: flank,
  },
  {
    name: "T-Bone Steak",
    price: 15,
    hunger_fulfillment: 13.4,
    image: tBone,
  },
  {
    name: "Strip Steak",
    price: 16,
    hunger_fulfillment: 13.5,
    image: strip,
  },
  {
    name: "Brisket Trimmed",
    price: 17,
    hunger_fulfillment: 13.9,
    image: trimmedBrisket,
  },
  {
    name: "Rib eye steak",
    price: 18,
    hunger_fulfillment: 13.9,
    image: ribeye,
  },
  {
    name: "Tendorlion Steak",
    price: 20,
    hunger_fulfillment: 14,
    image: tenderloin,
  },
];

export const randomNumber = (start:number, end:number)=> {
    // console.log("matos123")
    if(end<start) {
        console.error("End number smaller than start number")
    }
    let num = Math.round(start + (Math.random() * (end-start)));
    // console.log("matos:",num);
    return num;
}

