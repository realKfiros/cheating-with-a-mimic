import { css } from "@emotion/react";

export const menu = css`
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  justify-content: center;
  margin-top: 50px;
  align-items: center;

  > * {
    margin: 5px auto;
  }

  .title {
    font-family: "PixeliodSansBold";
    font-size: 12px;
    margin-bottom: 1px;
    color: #d2e8cf;
    text-shadow: 2px 2px 5px #45283c;
    /* -webkit-text-stroke: 0.75px #45283c; */
  }
`;

export const Spacer = () => (
  <div
    css={css`
      flex: 1 1 auto;
    `}
  />
);
