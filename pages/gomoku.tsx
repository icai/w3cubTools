import ConversionLayout from "@components/ConversionLayout";
import { Pane, Button, IconButton, RefreshIcon } from "evergreen-ui";
import { useEffect } from "react";
import {
  LINE_COLOR,
  POINT_RADIUS,
  POINT_XY,
  COLOR_BLACK,
  COLOR_WHITE,
  PADDING,
  CELL_PART,
  BOARD_SIZE,
  BOARD_CELL_SIZE,
  PIECE_RADIUS,
  LAYOUT_SIZE,
} from "@components/Gobang/constants";

interface WinsArray {
  [index: number]: {
    [index: number]: {
      [index: number]: boolean;
    }
  };
}

export default function Gomoku() {
  useEffect(() => {
    runGame();
  }, []);

  function runGame() {
    // 画布
    const chess = document.getElementById("canvas") as HTMLCanvasElement;
    const context = chess?.getContext("2d");
    if (!context) {
      console.error("Canvas context is null or undefined");
      return;
    }
    //画棋盘
    const drawChessBoard = () => {
      context.strokeStyle = LINE_COLOR;

      for (let i = 0; i < BOARD_SIZE; i++) {
        context.beginPath();
        context.moveTo(PADDING + i * BOARD_CELL_SIZE, PADDING);
        context.lineTo(
          PADDING + i * BOARD_CELL_SIZE,
          BOARD_CELL_SIZE * BOARD_SIZE - PADDING
        );
        context.stroke();
        context.moveTo(PADDING, PADDING + i * BOARD_CELL_SIZE);
        context.lineTo(
          BOARD_CELL_SIZE * BOARD_SIZE - PADDING,
          PADDING + i * BOARD_CELL_SIZE
        );
        context.stroke();
      }

      const Point_xy = POINT_XY();
      context.strokeStyle = LINE_COLOR;
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (~Point_xy.indexOf(i) && ~Point_xy.indexOf(j)) {
            context.beginPath();
            context.arc(
              CELL_PART + i * BOARD_CELL_SIZE,
              CELL_PART + j * BOARD_CELL_SIZE,
              POINT_RADIUS,
              0,
              Math.PI * 2
            );
            context.fill();
          }
        }
      }

      context.closePath();
    };
    drawChessBoard();

    //画圆
    const onStep = (i: number, j: number, me: boolean) => {
      context.beginPath();
      context.arc(
        CELL_PART + i * BOARD_CELL_SIZE,
        CELL_PART + j * BOARD_CELL_SIZE,
        PIECE_RADIUS,
        0,
        Math.PI * 2
      );
      context.closePath();

      const gradient = context.createRadialGradient(
        CELL_PART + i * BOARD_CELL_SIZE,
        CELL_PART + j * BOARD_CELL_SIZE,
        PIECE_RADIUS,
        CELL_PART + i * BOARD_CELL_SIZE,
        CELL_PART + j * BOARD_CELL_SIZE,
        0
      );

      if (me) {
        gradient.addColorStop(0, COLOR_BLACK[0]);
        gradient.addColorStop(1, COLOR_BLACK[1]);
      } else {
        gradient.addColorStop(0, COLOR_WHITE[0]);
        gradient.addColorStop(1, COLOR_WHITE[1]);
      }
      context.fillStyle = gradient;
      context.stroke(); //绘制
      context.fill(); //填充
    };

    let over = false;
    let me = true;
    //定义一个二维数组来保存棋盘上面的落子情况
    const chessBoard: number[][] = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(0)
    );

    chess.onclick = (e) => {
      if (over) {
        return;
      }
      if (!me) {
        return;
      }

      const x = e.offsetX;
      const y = e.offsetY;
      const i = Math.floor(x / BOARD_CELL_SIZE);
      const j = Math.floor(y / BOARD_CELL_SIZE);

      if (chessBoard[i][j] === 0) {
        onStep(i, j, me);
        chessBoard[i][j] = 1;

        for (let k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            myWin[k]++;
            computerWin[k] = 6;

            if (myWin[k] === 5) {
              alert("Unbelievable 你赢啦！");
              over = true;
            }
          }
        }

        if (!over) {
          me = !me;
          computerAI();
        }
      }
    };
    //制定输赢的规则
    const wins = [] as WinsArray;
    //遍历棋盘
    for (var i = 0; i < 15; i++) {
      wins[i] = [];
      for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
      }
    }

    let count = 0;

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
          wins[i][j + k][count] = true;
        }
        count++;
      }
    }

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
          wins[j + k][i][count] = true;
        }
        count++;
      }
    }

    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
          wins[i + k][j + k][count] = true;
        }
        count++;
      }
    }

    for (let i = 0; i < 11; i++) {
      for (let j = 14; j > 3; j--) {
        for (let k = 0; k < 5; k++) {
          wins[i + k][j - k][count] = true;
        }
        count++;
      }
    }

    const myWin: number[] = Array(count).fill(0);
    const computerWin: number[] = Array(count).fill(0);

    const computerAI = () => {
      const mySource: number[][] = Array.from({ length: 15 }, () =>
        Array(15).fill(0)
      );
      const computerSource: number[][] = Array.from({ length: 15 }, () =>
        Array(15).fill(0)
      );
      let max = 0;
      let u = 0,
        v = 0;

      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (chessBoard[i][j] === 0) {
            for (let k = 0; k < count; k++) {
              if (wins[i][j][k]) {
                if (myWin[k] === 1) {
                  mySource[i][j] += 200;
                } else if (myWin[k] === 2) {
                  mySource[i][j] += 400;
                } else if (myWin[k] === 3) {
                  mySource[i][j] += 2000;
                } else if (myWin[k] === 4) {
                  mySource[i][j] += 10000;
                }

                if (computerWin[k] === 1) {
                  computerSource[i][j] += 200;
                } else if (computerWin[k] === 2) {
                  computerSource[i][j] += 400;
                } else if (computerWin[k] === 3) {
                  computerSource[i][j] += 2000;
                } else if (computerWin[k] === 4) {
                  computerSource[i][j] += 10000;
                }
              }
            }

            if (mySource[i][j] > max) {
              max = mySource[i][j];
              u = i;
              v = j;
            }

            if (mySource[i][j] === max) {
              if (computerSource[i][j] > computerSource[u][v]) {
                u = i;
                v = j;
              }
            }

            if (computerSource[i][j] > max) {
              max = computerSource[i][j];
              u = i;
              v = j;
            }

            if (computerSource[i][j] === max) {
              if (mySource[i][j] > mySource[u][v]) {
                u = i;
                v = j;
              }
            }
          }
        }
      }

      onStep(u, v, false);
      chessBoard[u][v] = 2;

      for (let k = 0; k < count; k++) {
        if (wins[u][v][k]) {
          computerWin[k]++;
          myWin[k] = 6;

          if (computerWin[k] === 5) {
            over = true;
            setTimeout(() => {
              alert("你输啦，还要继续努力噢");
            });
          }
        }
      }

      if (!over) {
        me = !me;
      }
    };
  }

  return (
    <ConversionLayout flexDirection="column" layoutHeight="600px">
      <Pane
        width="800px"
        display="flex"
        justifyContent="center"
        height="100%"
        marginX="auto"
      >
        <canvas id="canvas" width={LAYOUT_SIZE} height={LAYOUT_SIZE}></canvas>
      </Pane>
      <div className="control">
        <div className="inner">
          <IconButton
            marginBottom={16}
            height={40}
            icon={RefreshIcon}
            onClick={() => {
              location.reload();
            }}
          />
        </div>
      </div>
      <style jsx>
        {`
          canvas {
            box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;
            background-color: #c19b6c;
          }
          .control {
            position: fixed;
            right: 10px;
            top: 20%;

            .inner {
              display: flex;
              flex-direction: column;
              margin: 35px 35px 0 0;
              font-size: 40px;
              align-items: center;
              flex: 0 0 5%;
              flex-wrap: wrap;
              height: 100%;
            }
          }
        `}
      </style>
    </ConversionLayout>
  );
}
