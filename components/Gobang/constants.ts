export const COLOR_GREY = "#C8C8C8";
export const COLOR_GREEN = "#75E675";
export const COLOR_BLUE = "#69AFF6";

export const COLOR_BLACK: [string, string] = ["#0a0a0a", "#636766"];
export const COLOR_WHITE: [string, string] = ["#d1d1d1", "#f9f9f9"];

export const LINE_COLOR = "#000";
export const POINT_RADIUS = 5;
export const POINT_SIZE_PER_LINE = 3;
export const POINT_START = 2;

export const BOARD_SIZE = 15;
export const CELL_SIZE = 40;
export const BOARD_CELL_SIZE = 40;
export const PADDING = BOARD_CELL_SIZE / 2;
export const CELL_PART = BOARD_CELL_SIZE / 2;
export const LAYOUT_SIZE = BOARD_CELL_SIZE * BOARD_SIZE;
export const PIECE_SIZE = BOARD_CELL_SIZE - 6;
export const PIECE_RADIUS = PIECE_SIZE / 2;

export const POINT_XY = () => {
  let POINT_END = BOARD_SIZE - 1 - POINT_START;
  let step = (POINT_END - POINT_START) / (POINT_SIZE_PER_LINE - 2 + 1);
  let point_xy = [] as number[];
  for (let i = POINT_START; i <= POINT_END; i += step) {
    point_xy.push(i);
  }
  return point_xy;
};
