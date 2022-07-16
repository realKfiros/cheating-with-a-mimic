import { css } from "@emotion/react";

interface MenuButtonProps {
  text: string;
  onClick: () => void;
}

const styleMenuButton = css`
  cursor: pointer;
  border: 2px solid black;
  border-radius: 5.6px;
  width: 47px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7px;
  background-color: #d9d1a9;
  color: #0d0d0d;
  line-height: 0.5rem;

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
