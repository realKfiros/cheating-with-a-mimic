import {action, makeObservable, observable} from "mobx";
import React from "react";

export const AppContext = React.createContext(null);

export interface StoreProps {
	count: number;
}
export class Store implements StoreProps
{
	@observable count = 0;
	constructor()
	{
		makeObservable(this);
	}
}