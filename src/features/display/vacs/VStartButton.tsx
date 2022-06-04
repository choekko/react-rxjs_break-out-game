/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler } from 'react';
import { css, Theme } from '@emotion/react';

interface VStartButtonProps {
  onStartBtnClick: MouseEventHandler;
}

function VStartButton({ onStartBtnClick }: VStartButtonProps) {
  return (
    <button css={theme => startButtonStyle(theme)} onClick={onStartBtnClick}>
      START
    </button>
  );
}

const startButtonStyle = (theme: Theme) => css`
  border-radius: 30px;
  width: 170px;
  height: 50px;
  font-weight: bold;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid ${theme.color.skyblue};
  padding-left: 20px;
  color: ${theme.color.skyblue};

  &:hover {
    border-color: white;
    color: white;
  }
`;

export default VStartButton;
