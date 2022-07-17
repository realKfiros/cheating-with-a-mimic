import React from 'react'
import {css} from "@emotion/react";
import streetPlayer from "../../assets/streetPlayer.png";
import {menu} from '../../styles';
import MenuButton from "../menu_button";

interface DeathScreenProps
{
	onStart: () => void;
	toMain: () => void;
}

const DeathScreen = ({onStart, toMain}: DeathScreenProps) =>
{
	const style = css`
		${menu};
		margin-top: 0;
		background-color: rgba(0, 0, 0, 0.7);
		color: rgb(255, 255, 255);
		z-index: 5;
		position: absolute;
		width: 100%;
		height: 100%;


		.streetPlayer {
			position: absolute;
			left: 200px;
			transform: rotate(-90deg);
		}
	`
	return (
		<div css={style}>
			<div className="centerDiv">
				<h1>YOU DIED..</h1>
				<img
					className="streetPlayer"
					src={streetPlayer}>
				</img>
				<MenuButton text="Start" onClick={() => onStart()} importance/>
				<MenuButton text="Back to Main Menu" onClick={() => toMain()} importance={false}/>
			</div>
		</div>
	)
}

export default DeathScreen;