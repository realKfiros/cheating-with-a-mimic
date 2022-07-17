import React, { FC, useState, useEffect } from "react";
import { css } from "@emotion/react";

interface MeterProps {
    value:number;
    label:string;
  }

const Meter:FC<MeterProps> = ({value, label}) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const rounded = Math.round(value);
        if(height != rounded) {
            setHeight(rounded);
        }
      }, [value]);
    const style =  css`
        /* position: absolute;
        z-index: 3;
        left: 300px;
        top:100px; */
        width:8px;
        height:102px;
        background-color: brown;
        box-shadow: 1px 1px 2px #45283c;
        .meterBorder{
            width: 6px;
            height: ${height}px;
            background-color: green;
            bottom:1px;
            left:1px;
            position:absolute;
            /* text-shadow: 1px 2px 2px #45283c; */
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