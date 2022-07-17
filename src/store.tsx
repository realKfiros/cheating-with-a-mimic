import {action, makeObservable, observable} from "mobx";
import React, {ReactNode} from "react";

export const AppContext = React.createContext<any>(null);

// @ts-ignore
let msInstance = null;
export const mainStoreInstance = (init: boolean = false) =>
{
	// @ts-ignore
	return msInstance = msInstance || (init && new Store());
};

export interface StoreProps
{
	dialog: DialogProps;
}

export interface ButtonProps
{
	title: string;
	onClick: () => void;
}

export interface DialogProps
{
	title: string;
	content: ReactNode | null;
	show: boolean;
	buttons: Array<ButtonProps>;
	onClose: () => void;
}

export class Store implements StoreProps
{
	@observable dialog: DialogProps = {
		title: '',
		content: null,
		show: false,
		buttons: [],
		onClose: () => undefined
	};

	constructor()
	{
		makeObservable(this);
	}

	@action.bound
	openDialog = ({title, content, buttons = [{title: 'Close', onClick: () => this.closeDialog()}], onClose = () => undefined}: DialogProps) =>
	{
		this.dialog.title = title;
		this.dialog.content = content as any;
		this.dialog.show = true;
		this.dialog.buttons = buttons;
		this.dialog.onClose = onClose;
	}

	@action.bound
	closeDialog = () =>
	{
		this.dialog.show = false;
		this.dialog.onClose();
	}
}