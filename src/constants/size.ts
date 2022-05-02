export const BAR_SIZE = 5; // First, odd number
export const DISPLAY_SIZE = {
  UNIT: 20,
  WIDTH: 20, // UNIT * WIDTH = pixel of width
  HEIGHT: 30, // UNIT * HEIGHT = pixel of height
};
export const Y_COORDINATE = Array.from({ length: DISPLAY_SIZE.HEIGHT }, (_, i) => i);
export const X_COORDINATE = Array.from({ length: DISPLAY_SIZE.WIDTH }, (_, i) => i);

export const BALL_SPEED = 1;
