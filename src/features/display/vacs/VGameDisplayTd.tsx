/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import { css } from '@emotion/react';

interface VGameDisplayTdProps {
  isColored: boolean;
}

function VGameDisplayTd({ isColored }: VGameDisplayTdProps) {
  return <td css={gameDisplayTdStyle(isColored)}></td>;
}

const gameDisplayTdStyle = (isValid: boolean) => css`
  background-color: ${isValid ? 'pink' : 'skyblue'};
`;

export default memo(VGameDisplayTd);
