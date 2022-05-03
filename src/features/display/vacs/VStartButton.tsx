/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler } from 'react';
import { css } from '@emotion/react';

interface VStartButtonProps {
  onStartBtnClick: MouseEventHandler;
}

function VStartButton({ onStartBtnClick }: VStartButtonProps) {
  return (
    <button css={startButtonStyle} onClick={onStartBtnClick}>
      {' '}
      Start{' '}
    </button>
  );
}

const startButtonStyle = css`
  width: 100px;
  height: 30px;
  font-weight: bold;
  font-size: 20px;
`;

export default VStartButton;
