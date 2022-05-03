import React from 'react';
import { createSignal } from '@react-rxjs/utils';
import VStartButton from 'features/display/vacs/VStartButton';
import { bind } from '@react-rxjs/core';

export const [gameStart$, setGameStart] = createSignal<boolean>();
export const [useGameStart] = bind(gameStart$, false);

function StartButton() {
  const handleStartBtnClick = () => {
    setGameStart(true);
  };

  return <VStartButton onStartBtnClick={handleStartBtnClick} />;
}

export default StartButton;
