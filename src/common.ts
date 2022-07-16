// @ts-ignore
import groundBeef from "./assets/meats/Ground Beef 2.png";
import kidney from "./assets/meats/Kidney 32x32.png";
import liver from "./assets/meats/Liver 32x32.png";
import heart from "./assets/meats/heart 32x32.png";
import tongue from "./assets/meats/tongue 32x32.png";
import shortRibs from "./assets/meats/short ribs 32x32.png";

export enum Stage {
  TABLE,
  STREET,
  BUTCHER_SHOP,
  UPGRADE_SHOP,
}

export const possibleStock = [
  {
    name: "Kidney",
    price: 2,
    hunger_fulfillment_per_second: 0.25,
    timer: 5,
    image: kidney,
  },
  {
    name: "Liver",
    price: 3,
    hunger_fulfillment_per_second: 0.32,
    timer: 5,
    image: liver,
  },
  {
    name: "Heart",
    price: 4,
    hunger_fulfillment_per_second: 0.4,
    timer: 5,
    image: heart,
  },
  {
    name: "Ground Beef",
    price: 5,
    hunger_fulfillment_per_second: 0.5,
    timer: 5,
    image: groundBeef,
  },
  {
    name: "Tongue",
    price: 7,
    hunger_fulfillment_per_second: 0.7,
    timer: 5,
    image: tongue,
  },
  {
    name: "Short Ribs",
    price: 9,
    hunger_fulfillment_per_second: 0.85,
    timer: 5,
    image: shortRibs,
  },
  {
    name: "Sirloin Steak",
    price: 11,
    hunger_fulfillment_per_second: 1.05,
    timer: 5,
    image: "",
  },
  {
    name: "Flank Steak",
    price: 12,
    hunger_fulfillment_per_second: 1.2,
    timer: 5,
    image: "",
  },
  {
    name: "T-Bone Steak",
    price: 15,
    hunger_fulfillment_per_second: 1.55,
    timer: 5,
    image: "",
  },
  {
    name: "Strip Steak",
    price: 16,
    hunger_fulfillment_per_second: 1.69,
    timer: 5,
    image: "",
  },
  {
    name: "Brisket Trimmed",
    price: 17,
    hunger_fulfillment_per_second: 1.75,
    timer: 5,
    image: "",
  },
  {
    name: "Rib eye steak",
    price: 18,
    hunger_fulfillment_per_second: 1.95,
    timer: 5,
    image: "",
  },
  {
    name: "Tendorlion Steak",
    price: 20,
    hunger_fulfillment_per_second: 2,
    timer: 5,
    image: "",
  },
];

export const randomNumber = (start: number, end: number) => {
  if (end < start) {
    console.error("End number smaller than start number");
  }
  return Math.floor(start + Math.random() * (end - start));
};

export const randomDies = (minSum: number) => {
  let sum = 0;
  let diceResults = [0, 0];
  while (sum < minSum) {
    diceResults[0] = randomNumber(1, 6);
    diceResults[1] = randomNumber(1, 6);
    sum = diceResults[0] + diceResults[1];
  }

  return diceResults;
};
