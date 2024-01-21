import ConversionLayout from "@components/ConversionLayout";
import React, { useState, useEffect } from "react";
import { Button, Pane } from "evergreen-ui";

interface Question {
  A: number;
  B: number;
  operator: string;
}

interface Page {
  questions: Question[];
  operators: string[];
}

interface MathCalcProps {}

const MathCalc: React.FC<MathCalcProps> = () => {
  const conf: { questions: number } = {
    questions: 100, //题目数
  };
  /**
   * gen a random number between 1 to n or n to m
   * @param {number} n
   * @param {number} m
   * @returns {number}
   */
  function getRandomNum(n: number, m: number): number {
    return (Math.random() * (m - n + 1) + n) | 0;
  }
  /**
   * select a operators from given operators list
   * @returns {*}
   */
  function getRandomOperator(operators: string[]): string {
    return operators[((Math.random() * 10000) | 0) % operators.length];
  }

  /**
   * return an array, small num is front
   * @param {number} n
   * @param {number} m
   * @returns {array}
   */
  function sortNum(n: number, m: number): number[] {
    m = m || 1;
    return n < m ? [n, m] : [m, n];
  }

  function getQuestion(operators: string[]): Question {
    const operator = getRandomOperator(operators);
    let A, B, C;

    if (operator === "+") {
      A = getRandomNum(1, 90);
      B = getRandomNum(1, 99 - A);
    } else if (operator === "-") {
      A = getRandomNum(2, 99);
      B = getRandomNum(1, 99);
      if (A < B) {
        C = A;
        A = B;
        B = C;
      }
      if (A === B) {
        B = B - 1;
      }
    } else if (operator === "×") {
      A = getRandomNum(1, 9);
      B = getRandomNum(1, 9);
    } else if (operator === "÷") {
      B = getRandomNum(1, 25);
      C = getRandomNum(1, (99 / B) | 0);
      A = B * C;
    }

    return { A, B, operator };
  }

  const [hideFrom, setHideFrom] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);

  function insertPage(operators: string[], nums: number): void {
    let ps: Page[] = [];
    for (let index = 0; index < nums; index++) {
      let quesSet: Question[] = [];
      for (var i = 1; i <= conf.questions; i++) {
        quesSet.push(getQuestion(operators));
      }
      ps = ps.concat({
        questions: quesSet,
        operators: operators,
      });
    }
    setPages(ps);
  }

  const onClick = (s: string): void => {
    let operators = s.split(" ");
    setHideFrom(true);
    insertPage(operators, 5);
  };

  const lists: string[] = ["+", "-", "×", "÷", "+ -", "× ÷", "+ - ×", "+ - × ÷"];

  const rightctrl = hideFrom ? "widget" : "";

  const styles = {
    button: {
      margin: "10px auto",
      width: "180px",
      height: "35px",
      font: "20px/25px Verdana Arial",
      borderRadius: "5px",
      display: "block",
    },
  };

  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <Pane
        // @ts-ignore
        minHeight="500px"
      >
        <div className={"form hidden-print " + rightctrl}>
          {lists.map((el, ix) => {
            return (
              <Button
                style={styles.button}
                key={ix}
                onClick={() => onClick(el)}
              >
                {el}
              </Button>
            );
          })}
          {hideFrom && (
            <>
              <Button
                style={styles.button}
                onClick={() => {
                  window.print();
                }}
              >
                Print Page
              </Button>
              <Button
                style={styles.button}
                onClick={() => {
                  setShowResult(!showResult);
                }}
              >
                Toggle Result
              </Button>
            </>
          )}
        </div>
        <div className="exam">
          {pages.map((item, index) => {
            return (
              <div className="page" key={index}>
                <ul className="questions">
                  {item.questions.map(({ A, operator, B }, ix) => {
                    return (
                      <div className="question" key={ix}>
                        <span className="A">{A}</span>
                        <span className="O">{operator}</span>
                        <span className="B">{B}</span>
                        <span className="O">=</span>
                        {showResult && (
                          <span className="X">
                            {eval(
                              "(" +
                                (A + "" + operator + "" + B)
                                  .replace("×", "*")
                                  .replace("÷", "/") +
                                ")"
                            )}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </ul>
                <div className="bottom">
                  本页训练运算符: {item.operators.join(" ")}
                </div>
                <div className="PageNext"></div>
              </div>
            );
          })}
        </div>
        <style jsx>
          {`
            .form {
              text-align: center;
              transition: all 0.5s ease-out;
            }
            .questions {
              display: block;
              width: 880px;
              padding: 30px 0 0 0;
              font-size: 21px;
              margin: 0 auto;
            }
            .form.widget {
              position: fixed;
              right: 80px;
              top: 50%;
              margin-top: -230px;
              z-index: 1;
            }

            .question {
              display: inline-block;
              width: 220px;
              height: 50px;
              border: 1px solid #ccc;
              border-collapse: collapse;
              border-radius: 5px;
              margin: 0 -1px -1px 0;
              padding: 10px;
            }

            .n {
              font-size: 8px;
              display: inline-block;
              width: 12px;
              text-align: center;
              color: #ccc;
              float: left;
              position: relative;
              top: -11px;
              left: -11px;
            }

            .A,
            .B,
            .X {
              width: 40px;
              display: inline-block;
              text-align: center;
            }

            .X {
              color: green;
            }

            .O {
              width: 20px;
              display: inline-block;
              text-align: center;
            }

            .PageNext {
              page-break-after: always;
            }

            .bottom {
              width: 850px;
              margin: 10px auto 0;
              font: 12px/14px Verdana Arial;
            }
          `}
        </style>
      </Pane>
    </ConversionLayout>
  );
};

export default MathCalc;
