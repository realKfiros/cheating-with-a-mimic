import React, { FC } from "react";
import { css } from "@emotion/react";

interface MeterProps {
    value:number;
    label:string;
  }

const Meter:FC<MeterProps> = ({value, label}) => {
    const style =  css`
        /* position: absolute;
        z-index: 3;
        left: 300px;
        top:100px; */
        width:8px;
        height:102px;
        background-color: brown;
        .meterBorder{
            width: 6px;
            height: ${value}px;
            background-color: green;
            bottom:1px;
            left:1px;
            position:absolute;
        }
        .meterTitle {
            text-align:center;
            position:absolute;
            top: -20px;
        }
    `;

    return (
        <div css={style}>
            <div className="meterTitle">
                <div>{label}</div>
            </div>
            <div className="meterBorder">
                <div className="meterBar" />
            </div>
        </div>
    )
}

export default Meter