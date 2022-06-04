/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler } from 'react';
import { css, Theme } from '@emotion/react';
import { DISPLAY_SIZE } from 'constants/size';

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
  color: ${theme.color.skyblue};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding-right: 20.5px;

  &:before {
    content: '●';
    color: rgba(0, 0, 0, 0);
    display: inline-block;
    border-radius: 100%;
    background-color: ${theme.color.skyblue};
    opacity: 0.5;
    width: ${DISPLAY_SIZE.UNIT}px;
    height: ${DISPLAY_SIZE.UNIT}px;
  }

  &:hover {
    border-color: white;
    color: white;
  }
`;

export default VStartButton;
