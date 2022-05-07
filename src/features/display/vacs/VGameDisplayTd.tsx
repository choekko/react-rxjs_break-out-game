/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import { css, Theme } from '@emotion/react';

interface VGameDisplayTdProps {
  isColored: boolean;
  isRounded: boolean;
}

function VGameDisplayTd({ isColored, isRounded }: VGameDisplayTdProps) {
  return <td css={theme => gameDisplayTdStyle(theme, isColored, isRounded)}></td>;
}

const gameDisplayTdStyle = (theme: Theme, isValid: boolean, isRounded: boolean) => css`
  background-color: ${isValid ? theme.color.skyblue : theme.color.backgroundDark};
  ${isRounded && 'border-radius: 100%'};
`;

export default memo(VGameDisplayTd);
