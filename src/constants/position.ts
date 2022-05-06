import { DISPLAY_SIZE } from 'constants/size';

export const Y_COORDINATE = Array.from({ length: DISPLAY_SIZE.HEIGHT }, (_, i) => i);
export const X_COORDINATE = Array.from({ length: DISPLAY_SIZE.WIDTH }, (_, i) => i);
export const BAR_POSITION_Y = 1;
export const BAR_START_POSITION_X = Math.floor(DISPLAY_SIZE.WIDTH / 2);
export const BALL_START_POSITION_X = Math.floor(DISPLAY_SIZE.WIDTH / 2) - 1;
export const BALL_START_POSITION_Y = Math.floor(DISPLAY_SIZE.HEIGHT / 2);
