/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { DISPLAY_SIZE } from 'constants/size';
import { X_COORDINATE, Y_COORDINATE } from 'constants/position';
import StartButton from 'features/display/StartButton';
import VGameDisplayTd from 'features/display/vacs/VGameDisplayTd';

export interface VGameDisplayProps {
  positions: number[][];
  isStarted: boolean;
  ballPosition: [number, number];
  hit: boolean;
}

function VGameDisplay({ positions, ballPosition, isStarted, hit }: VGameDisplayProps) {
  return (
    <section css={theme => gameDisplayWrapStyle(theme, hit)}>
      <table css={theme => gameDisplayStyle(theme, isStarted)}>
        <tbody>
          {[...Y_COORDINATE].reverse().map(positionY => (
            <tr key={positionY}>
              {X_COORDINATE.map(positionX => (
                <VGameDisplayTd
                  key={`${positionX}-${positionY}`}
                  isColored={Boolean(positions.find(([x, y]) => x === positionX && y === positionY))}
                  isRounded={Boolean(positionX === ballPosition[0] && positionY === ballPosition[1])}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!isStarted && (
        <div css={startButtonWrapStyle}>
          <StartButton />
        </div>
      )}
    </section>
  );
}

const gameDisplayWrapStyle = (theme: Theme, hit: boolean) => css`
  border: 3px solid ${hit ? theme.color.skyblue : 'rgba(0, 0, 0, .8)'};
  display: inline-block;
  width: ${DISPLAY_SIZE.WIDTH * DISPLAY_SIZE.UNIT}px;
  height: ${DISPLAY_SIZE.HEIGHT * DISPLAY_SIZE.UNIT}px;
  position: relative;
`;

const gameDisplayStyle = (theme: Theme, isStarted: boolean) => css`
  height: inherit;
  width: inherit;
  background-color: ${theme.color.backgroundDark};
  opacity: ${isStarted ? 1 : 0.4};
`;

const startButtonWrapStyle = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default memo(VGameDisplay);
