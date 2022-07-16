import React from "react";

export interface Stock {
  name: string;
  price: number;
  image: string;
}

const ListItem: React.FC<Stock> = ({ name, price, image }) => {
  return <div>ListItem</div>;
};

export default ListItem;
