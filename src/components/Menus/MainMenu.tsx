import React from 'react';
import { css } from "@emotion/react";

const styleMainMenu = css`
    display: flex;
    flex-direction: column;
    .title {
        
    }
    .button {

    }
    .start {

    }
    .credits {

    }
`;

const MainMenu = () => {
  return (
    <div css={styleMainMenu}>
        <div className="title">Whacky Dice</div>
        <img className="button start" onClick={() => console.log("start")}/>
        <img className="button credits" onClick={() => console.log("open credits modal")} />
    </div>
  )
}

export default MainMenu;