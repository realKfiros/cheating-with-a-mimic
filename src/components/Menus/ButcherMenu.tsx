import React, {FC, useContext, useState} from "react";
import MenuButton from "../menu_button";
import {Stock} from "../list_item";
import {menu, Spacer} from "../../styles";
import {css} from "@emotion/react";
import {action, computed, makeObservable, observable} from "mobx";
import {AppContext} from "../../store";
import {classNames, pick} from "../../utilities";
import image from "../../assets/Ground Beef 2.png";
import {possibleStock} from "../../common";

const styleButcherMenu = css`
	${menu}
	.vertical {
		display: flex;
		flex-direction: row;

		> * {
			flex: 1;
			margin: auto auto 0;
		}
	}
`;
const ButcherMenu = () =>
{
	const {openDialog}: any = useContext(AppContext);
	const [stock, setStock] = useState<Stock[]>([]);
	// TODO: after "an hour" (or a day) it should refresh with new items

	const [cart, setCart] = useState<Stock[]>([]);
	// TODO: after clicking on the buy button it will increase the hunger meter

	return (
		<div css={styleButcherMenu}>
			<div className="title">Welcome to Tony’s</div>
			<div className="vertical">
				<ButcherBoard/>
				<Spacer/>
				<MenuButton text="Buy" onClick={() => openDialog("Bought that", "enjoy :)")}/>
			</div>
		</div>
	);
};

interface ButcherItem
{
	name: string;
	price: number;
	hunger_fulfillment_per_second: number;
	timer: number;
}

const styleButcherBoard = css`
	background-color: #d9d9d9;
	border-radius: 2px;
	max-width: 180px;

	> div {
		margin: 5px;
	}
`;
const ButcherBoard = () =>
{
	const options = pick(possibleStock, 3);
	return (
		<div css={styleButcherBoard}>
			{options.map((o, index) => (
				<Item key={index} {...o} />
			))}
		</div>
	);
};

const styleItem = ({selected}: any) => css`
	background-color: ${selected ? "#4d4d4d" : "#F8F8F8"};
	display: flex;
	flex-direction: row;
	padding: 4px 5px;
	cursor: default;
	width: 120px;

	> * {
		flex: 1;
		margin: 1px;
	}

	img {
		width: 32px;
		height: 32px;
	}

	.item-title,
	.item-price {
		//margin: auto;
	}

	.item-title {
		font-size: 7px;
		text-align: start;
		line-height: 0.5rem;
		margin: auto;
	}

	.item-price {
		display: flex;
		align-items: flex-end;
		text-align: end;
		font-size: 5px;
	}
`;
const Item: FC<ButcherItem> = ({name, price}) =>
{
	const [selected, setSelected] = useState(false);

	return (
		<div css={styleItem({selected})} onClick={() => setSelected(!selected)}>
			<img src={image}/>
			<span className="item-title">{name}</span>
			<span className="item-price">{price}$</span>
		</div>
	);
};

export default ButcherMenu;
