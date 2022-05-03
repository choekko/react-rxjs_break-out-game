import { Direction } from 'types/physics';
import { BAR_HALF_SIZE, DISPLAY_SIZE } from 'constants/size';

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

export const move = (prevPosition: number, direction: Direction) => {
  const nextPosition = prevPosition + direction;
  if (DISPLAY_SIZE.WIDTH - 1 < nextPosition + BAR_HALF_SIZE || nextPosition - BAR_HALF_SIZE < 0) {
    return prevPosition;
  }
  return nextPosition;
};
