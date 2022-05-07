/** @jsxImportSource @emotion/react */
import React from 'react';
import GameDisplay from 'features/display/GameDisplay';
import { css, Theme } from '@emotion/react';

function Main() {
  return (
    <main css={theme => mainPageStyle(theme)}>
      <GameDisplay />;
    </main>
  );
}

const mainPageStyle = (theme: Theme) => css`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.color.backgroundDeepDark};
  justify-content: center;
  align-items: center;
`;

export default Main;
