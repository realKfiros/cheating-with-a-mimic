import {action, makeObservable, observable} from "mobx";
import React from "react";

export const AppContext = React.createContext(null);

export interface StoreProps {
	// props
}
export class Store implements StoreProps
{
	constructor()
	{
		// makeObservable(this);
	}
}