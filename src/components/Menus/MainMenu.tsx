import React from 'react';
import { css } from "@emotion/react";
import MenuButton from '../menu_button';

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
        <MenuButton text="start!" onClick={() => window.alert('wow')} />
    </div>
  )
}

export default MainMenu;