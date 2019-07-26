import Calculator from "@components/Calculator";
import ConversionLayout from "@components/ConversionLayout";
import { Pane, Button, IconButton } from "evergreen-ui";
import { useLayoutEffect } from "react";
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
  LAYOUT_SIZE
} from "@components/Gobang/constants";

export default function() {
  function runGame() {
    //拿到画布
    var chess = document.getElementById("canvas") as HTMLCanvasElement;
    //获取权限
    var context = chess.getContext("2d");
    //画棋盘
    var drawChessBoard = function() {
      //线条颜色
      context.strokeStyle = LINE_COLOR;

      for (var i = 0; i < BOARD_SIZE; i++) {
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
      for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
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
    //context.arc(x,y,r,开始，结束)
    var onStep = function(i, j, me) {
      context.beginPath(); //开始路径
      context.arc(
        CELL_PART + i * BOARD_CELL_SIZE,
        CELL_PART + j * BOARD_CELL_SIZE,
        PIECE_RADIUS,
        0,
        Math.PI * 2
      );
      context.closePath(); //结束路径
      // if (me) {
      //   context.fillStyle = COLOR_BLACK;
      // } else {
      //   context.strokeStyle = COLOR_GREY;
      //   context.fillStyle = COLOR_WHITE;
      // }
      // 设置渐变颜色 ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
      var gradient = context.createRadialGradient(
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
    //结束标志
    var over = false;
    var me = true;
    //定义一个二维数组来保存棋盘上面的落子情况
    var chessBoard = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
      chessBoard[i] = [];
      for (var j = 0; j < BOARD_SIZE; j++) {
        chessBoard[i][j] = 0;
      }
    }
    chess.onclick = function(e) {
      if (over) {
        return;
      }
      if (!me) {
        return;
      }
      //获取鼠标坐标
      var x = e.offsetX;
      var y = e.offsetY;
      var i = Math.floor(x / BOARD_CELL_SIZE); //向下取整
      var j = Math.floor(y / BOARD_CELL_SIZE);

      if (chessBoard[i][j] == 0) {
        onStep(i, j, me);
        chessBoard[i][j] = 1;
        for (var k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            myWin[k]++;
            computerWin[k] = 6;
            if (myWin[k] == 5) {
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
    var wins = [];
    //遍历棋盘
    for (var i = 0; i < 15; i++) {
      wins[i] = [];
      for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
      }
    }
    var count = 0; //赢法的索引
    //横线赢的方法
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
          wins[i][j + k][count] = true;
        }
        count++;
      }
    }
    //竖线赢的方法
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
          wins[j + k][i][count] = true;
        }
        count++;
      }
    }

    //斜线赢的算法
    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
          wins[i + k][j + k][count] = true;
        }
        count++;
      }
    }

    //反斜线赢的算法
    for (var i = 0; i < 11; i++) {
      for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
          wins[i + k][j - k][count] = true;
        }
        count++;
      }
    }

    //console.log(count);赢法

    //赢法统计数组
    var myWin = [];
    var computerWin = [];
    for (var i = 0; i < count; i++) {
      myWin[i] = 0;
      computerWin[i] = 0;
    }

    //计算机AI算法
    var computerAI = function() {
      //我方分数
      var mySource = [];
      //计算机分数
      var computerSource = [];
      var max = 0; //保存最高点的分数
      var u = 0,
        v = 0; //保存最高点分数的坐标

      for (var i = 0; i < 15; i++) {
        mySource[i] = []; //我方分数
        computerSource[i] = []; //计算机分数
        //初始化分数
        for (var j = 0; j < 15; j++) {
          mySource[i][j] = 0;
          computerSource[i][j] = 0;
        }
      }
      for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
          if (chessBoard[i][j] == 0) {
            for (var k = 0; k < count; k++) {
              if (wins[i][j][k]) {
                //我方下棋
                if (myWin[k] == 1) {
                  mySource[i][j] += 200;
                } else if (myWin[k] == 2) {
                  mySource[i][j] += 400;
                } else if (myWin[k] == 3) {
                  mySource[i][j] += 2000;
                } else if (myWin[k] == 4) {
                  mySource[i][j] += 10000;
                } else {
                }

                //计算机下棋
                if (computerWin[k] == 1) {
                  computerSource[i][j] += 200;
                } else if (computerWin[k] == 2) {
                  computerSource[i][j] += 400;
                } else if (computerWin[k] == 3) {
                  computerSource[i][j] += 2000;
                } else if (computerWin[k] == 4) {
                  computerSource[i][j] += 10000;
                } else {
                }
              }
            }
            //我方
            if (mySource[i][j] > max) {
              max = mySource[i][j];
              u = i;
              v = j;
            }
            if (mySource[i][j] == max) {
              if (computerSource[i][j] > computerSource[u][v]) {
                u = i;
                v = j;
              }
            }

            //计算机
            if (computerSource[i][j] > max) {
              max = computerSource[i][j];
              u = i;
              v = j;
            }
            if (computerSource[i][j] == max) {
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
      for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
          computerWin[k]++;
          myWin[k] = 6;
          if (computerWin[k] == 5) {
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

  useLayoutEffect(() => {
    runGame();
  }, []);

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
          {/* <Button
                marginRight={10}
                height={40}
                width="100%"
                margin="5px"
                display="block"
                whiteSpace="nowrap"
            >Start Game</Button> */}
          <IconButton
            marginBottom={16}
            height={40}
            icon="refresh"
            onClick={() => {
              location.reload();
            }}
          />
          {/* <Button
                marginRight={10}
                height={40}
                width="100%"
                margin="5px"
                display="block"
                whiteSpace="nowrap"
                onClick={()=> {}}
            >New Game</Button> */}
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
