import { Direction } from 'types/physics';
import { DISPLAY_SIZE } from 'constants/size';

export const getDirectionByKey = (key: KeyboardEvent['key']): Direction => {
  switch (key) {
    case 'ArrowLeft':
      return -1;
    case 'ArrowRight':
      return 1;
    default:
      return 0;
  }
};

export const moveX = (prevPosition: number, direction: Direction, bodyHalfSize: number = 0) => {
  const nextPosition = prevPosition + direction;
  if (DISPLAY_SIZE.WIDTH - 1 < nextPosition + bodyHalfSize || nextPosition - bodyHalfSize < 0) {
    return prevPosition;
  }
  return nextPosition;
};

export const moveY = (prevPosition: number, direction: Direction) => {
  const nextPosition = prevPosition + direction;
  if (DISPLAY_SIZE.HEIGHT - 1 < nextPosition || nextPosition < 0) {
    return prevPosition;
  }
  return nextPosition;
};
