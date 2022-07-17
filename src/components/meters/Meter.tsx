import { css } from "@emotion/react";

const styleMeter = css`
`

const Meter = (value:number) => {
    const barStyle = "height:25px;width:"+value+"%;"
    return (
        <div css={styleMeter}>
            <div className="meterBorder">
                <div className="meterBar" style={barStyle}/>
            </div>
        </div>
    )
}

export default Meter