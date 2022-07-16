import {action, makeObservable, observable} from "mobx";
import React, {ReactNode} from "react";

export const AppContext = React.createContext(null);

export interface StoreProps {
	dialog: object;
}
export class Store implements StoreProps
{
	@observable dialog = {
		title: '',
		content: null,
		show: false
	};

	constructor()
	{
		makeObservable(this);
	}

	@action.bound
	openDialog = (title: string, content: ReactNode) =>
	{
		this.dialog.title = title;
		this.dialog.content = content as any;
		this.dialog.show = true;
	}

	@action.bound
	closeDialog = () =>
	{
		this.dialog.show = false;
	}
}