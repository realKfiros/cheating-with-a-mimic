import React, {FC, useContext, useState} from "react";
import MenuButton from "../menu_button";
import {Stock} from "../list_item";
import {menu, Spacer} from "../../styles";
import {css} from "@emotion/react";
import {action, computed, makeObservable, observable} from "mobx";
import {AppContext} from "../../store";
import {classNames} from "../../utilities";

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

	return <div css={styleButcherMenu}>
		<div className="title">Welcome to Tony’s</div>
		<div className="vertical">
			<ButcherBoard />
			<Spacer />
			<MenuButton text="Buy" onClick={() => openDialog('Bought that', 'enjoy :)')}/>
		</div>
	</div>;
};

interface ButcherItem
{
	title: string;
	price: string;
	selected: boolean;
}

const styleButcherBoard = css`
	background-color: #D9D9D9;
	border-radius: 40px;
	
	> div {
		margin: 36px;
	}
`;
const ButcherBoard = () =>
{
	const options = [
		{title: 'Ground meat', price: '10$', selected: false},
		{title: 'Serloin', price: '25$', selected: false},
		{title: 'Ribeye', price: '50$', selected: false},
	]
	return <div css={styleButcherBoard}>
		{options.map((o, index) => <Item key={index} {...o} />)}
	</div>
}

const styleItem = ({selected}: any) => css`
	width: 367px;
	height: 105px;
	background-color: ${selected ? '#4d4d4d' : '#F8F8F8'};
	display: flex;
	flex-direction: row;
	padding: 22px 28px;
	cursor: default;

	> * {
		flex: 1;
		margin: 10px;
	}
	
	img {
		min-width: 100px;
		height: 100px;
	}

	.item-title, .item-price {
		margin: auto;
	}

	.item-title {
		font-size: 40px;
		line-height: 3rem;
		text-align: start;
	}

	.item-price {
		font-size: 30px;
	}
`;
const Item: FC<ButcherItem> = ({title, price}) =>
{
	const [selected, setSelected] = useState(false);

	return <div css={styleItem({selected})} onClick={() => setSelected(!selected)}>
		<img/>
		<span className="item-title">{title}</span>
		<span className="item-price">{price}</span>
	</div>
};

export default ButcherMenu;
