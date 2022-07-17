import React from 'react'
import { css } from "@emotion/react";
import streetPlayer from "../../assets/streetPlayer.png";
import MenuButton from "../menu_button";

interface DeathScreenProps {
  onStart: () => void;
  toMain: () => void;    
}

const DeathScreen = ({onStart, toMain}: DeathScreenProps) =>{
    const style = css`
        background-color: black;
        z-index: 5;
        position:absolute;
        width: 100%;
        height: 100%;
        
        .centerDiv{
            position:absolute;
            left: 700px;
            top: 400px;
        }
    `
    return (
        <div css={style}>
            <div className="centerDiv">
            <h1>you died lol :)</h1>
              <img
                className="streetPlayer"
                src={streetPlayer}>
              </img>
              <MenuButton text="Start" onClick={() => onStart()} importance />
              <MenuButton text="Back to Main Menu" onClick={() => toMain()} importance={false} />
            </div>
        </div>
    )
}

export default DeathScreen;