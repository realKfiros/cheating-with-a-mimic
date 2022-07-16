import { css } from "@emotion/react";

export const menu = css`
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  justify-content: center;
  align-items: center;

  > * {
    margin: 5px auto;
  }

  .title {
    font-family: "PixeliodSansBold";
    font-size: 10px;
    margin-bottom: 1px;
  }
`;

export const Spacer = () => (
  <div
    css={css`
      flex: 1 1 auto;
    `}
  />
);
