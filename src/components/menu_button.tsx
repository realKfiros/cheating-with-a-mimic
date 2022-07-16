import { css } from "@emotion/react";

interface MenuButtonProps {
  text: string;
  onClick: () => void;
}

const styleMenuButton = css`
  cursor: pointer;
  border: 4px solid black;
  border-radius: 28px;
  width: 230px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background-color: #d9d1a9;
  color: #0d0d0d;

  &:active {
    background-color: #a6a381;
  }
`;
const MenuButton = ({ text, onClick }: MenuButtonProps) => {
  return (
    <div css={styleMenuButton} onClick={onClick}>
      {text}
    </div>
  );
};

export default MenuButton;
