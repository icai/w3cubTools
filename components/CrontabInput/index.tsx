import React, { useState, useEffect, useRef } from "react";
import cronstrue from "cronstrue/i18n";
import Cron from "cron-converter";
import valueHints from "./valueHints";
import locales from "./locales";

interface CrontabInputProps {
  locale?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CrontabInput: React.FC<CrontabInputProps> = ({
  locale = "en",
  value = "",
  onChange = () => {}
}) => {
  const [parsed, setParsed] = useState<any>({});
  const [highlightedExplanation, setHighlightedExplanation] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [selectedPartIndex, setSelectedPartIndex] = useState<number>(-1);
  const [nextSchedules, setNextSchedules] = useState<string[]>([]);
  const [nextExpanded, setNextExpanded] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<number>(-1);

  const [selectedDirectly, setSelectedDirectly] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  let lastCaretPosition = useRef<number>(-1);

  useEffect(() => {
    calculateNext();
    calculateExplanation();
  }, [value]);

  const clearCaretPosition = () => {
    lastCaretPosition.current = -1;
    setSelectedPartIndex(-1);
  };

  const calculateNext = () => {
    let schedules: string[] = [];
    try {
      const cronInstance = new Cron();
      cronInstance.fromString(value);
      let timePointer = +new Date();
      for (let i = 0; i < 5; i++) {
        const schedule = cronInstance.schedule(timePointer);
        const next = schedule.next();
        schedules.push(next.format("YYYY-MM-DD HH:mm:ss"));
        timePointer = +next + 1000;
      }
    } catch (e) {}
    setNextSchedules(schedules);
  };
  
  const highlightParsed = (index: number) => {
    let toHighlight = [] as any;
    let highlighted = "";

    for (let i = 0; i < 5; i++) {
      if (parsed.segments[i] && parsed.segments[i].text) {
        toHighlight.push({ ...parsed.segments[i] });
      } else {
        toHighlight.push(null);
      }
    }

    if (index >= 0) {
      if (toHighlight[index]) {
        toHighlight[index].active = true;
      }
    }

    // handle special case where minute/hour is presented in the same segment
    if (
      toHighlight[0] &&
      toHighlight[1] &&
      toHighlight[0].text &&
      toHighlight[0].text === toHighlight[1].text &&
      toHighlight[0].start === toHighlight[1].start
    ) {
      if (toHighlight[1].active) {
        toHighlight[0] = null;
      } else {
        toHighlight[1] = null;
      }
    }

    toHighlight = toHighlight.filter((_) => _);

    toHighlight.sort((a, b) => {
      return a.start - b.start;
    });

    let pointer = 0;
    toHighlight.forEach((item) => {
      if (pointer > item.start) {
        return;
      }
      highlighted += parsed.description.substring(pointer, item.start);
      pointer = item.start;
      highlighted += `<span${item.active ? ' class="active"' : ""}>${parsed.description.substring(
        pointer,
        pointer + item.text.length
      )}</span>`;
      pointer += item.text.length;
    });

    highlighted += parsed.description.substring(pointer);

    return highlighted;
  };

  const calculateExplanation = (callback?: () => void) => {
    let currentIsValid = true;
    let currentParsed;
    let currentHighlightedExplanation;
    try {
      currentParsed = cronstrue.toString(value, {
        locale: locale,
        use24HourTimeFormat: true,
      });
      currentHighlightedExplanation = currentParsed;
    } catch (e) {
      currentHighlightedExplanation = e.toString();
      currentIsValid = false;
    }

    setParsed(currentParsed);
    setHighlightedExplanation(currentHighlightedExplanation);
    setIsValid(currentIsValid);

    if (currentIsValid) {
      // setHighlightedExplanation(highlightParsed(-1));
    }

    if (callback) {
      callback();
    }
  };

  const onCaretPositionChange = () => {
    if (!inputRef.current) {
      return;
    }

    const caretPosition = inputRef.current.selectionStart || 0;
    const selected = value.substring(caretPosition, inputRef.current.selectionEnd || 0);

    if (selected.indexOf(" ") >= 0) {
      lastCaretPosition.current = -1;
    }

    if (lastCaretPosition.current === caretPosition) {
      return;
    }

    lastCaretPosition.current = caretPosition;

    if (caretPosition === -1) {
      setSelectedPartIndex(-1);
      return;
    }

    const textBeforeCaret = value.substring(0, caretPosition);
    const index = textBeforeCaret.split(" ").length - 1;

    setSelectedPartIndex(index);
  };

  const getLocale = () => {
    return locales[locale];
  };

  const selectPart = (index: number) => {
    setSelectedPartIndex(index);

    const e = {
      selectedPart: index + 1,
      text: value,
    };

    const t = selectedPart;
    const inputRefCurrent = inputRef.current;

    setTimeout(() => {
      (function (e, t) {
        if (e.selectedPart && e.selectedPart !== t && !selectedDirectly) {
          const n = e.text.split(" ").slice(0, e.selectedPart);
          const r = n.pop()?.length || 0;
          let o = n.join(" ").length;
          if (o > 0) {
            o += 1;
          }
          const a = inputRefCurrent as HTMLInputElement;
          a.selectionStart = o;
          a.selectionEnd = o + r;
          a.focus();
        }
        setSelectedPart(index + 1);
      })(e, t);
    }, 0);
  };

  return (
    <div className="crontab-input">
      <div
        className="explanation"
        dangerouslySetInnerHTML={{
          __html: isValid
            ? `“${highlightedExplanation}”`
            : "　",
        }}
      />

      <div className="next">
        {!!nextSchedules.length && (
          <span>
            {getLocale().nextTime}: {nextSchedules[0]}{" "}
            {nextExpanded ? (
              <a onClick={() => setNextExpanded(false)}>
                ({getLocale().hide})
              </a>
            ) : (
              <a onClick={() => setNextExpanded(true)}>
                ({getLocale().showMore})
              </a>
            )}
            {!!nextExpanded && (
              <div className="next-items">
                {nextSchedules.slice(1).map((item, index) => (
                  <div className="next-item" key={index}>
                    {getLocale().then}: {item}
                  </div>
                ))}
              </div>
            )}
          </span>
        )}
      </div>
      <div className="cron-wrap">
        <input
          type="text"
          className={`cron-input ${!isValid ? "error" : ""}`}
          value={value}
          ref={(ref) => {
            inputRef.current = ref;
          }}
          onMouseUp={(e) => {
            onCaretPositionChange();
          }}
          onKeyUp={(e) => {
            onCaretPositionChange();
          }}
          onBlur={(e) => {
            clearCaretPosition();
          }}
          onChange={(e) => {
            let parts = e.target.value.split(" ").filter((_) => _);
            if (parts.length !== 5) {
              onChange(e.target.value);
              setParsed({});
              setIsValid(false);
              return;
            }

            onChange(e.target.value);
          }}
        />
      </div>

      <div className="parts">
        {[
          getLocale().minute,
          getLocale().hour,
          getLocale().dayMonth,
          getLocale().month,
          getLocale().dayWeek,
        ].map((unit, index) => (
          <div
            key={index}
            className={`part ${selectedPartIndex === index ? "selected" : ""}`}
            onClick={() => {
              selectPart(index);
            }}
          >
            {unit}
          </div>
        ))}
      </div>

      {valueHints[locale][selectedPartIndex] && (
        <div className="allowed-values">
          {valueHints[locale][selectedPartIndex].map((value, index) => (
            <div className="value" key={index}>
              <div className="key">{value[0]}</div>
              <div className="value">{value[1]}</div>
            </div>
          ))}
        </div>
      )}
      <style jsx lang="less">{`
          .crontab-input {
            .explanation {
              text-align: center;
              margin: 16px 0 8px;
              font-size: 40px;
              color: rgb(24, 144, 255);
              min-height: 3em;
              span {
                background: transparent;
                color: inherit;
                &.active {
                  text-decoration: underline;
                }
              }
            }

            .next {
              a {
                text-decoration: underline;
                cursor: pointer;
              }
              font-size: 0.9em;
              opacity: 0.6;
              margin-bottom: 6px;
              line-height: 1.5;
            }

            .cron-wrap {
              width: 680px;
              margin: auto;
            }

            .cron-input {
              font-family: "Courier New", Courier, monospace;
              font-size: 60px;
              text-align: center;
              width: 100%;
              border-radius: 100px;
              border: 1px solid rgb(24, 144, 255);
              outline: none;
              padding-top: 8px;
              height: 70px;
              &.error {
                border: 1px solid red;
              }
            }

            .parts {
              margin-top: 3px;
              .part {
                display: inline-block;
                width: 100px;
                text-align: center;
                cursor: pointer;
                &.selected {
                  font-weight: bold;
                  color: rgb(24, 144, 255);
                }
              }
            }

            .allowed-values {
              margin-top: 12px;
              height: 180px;
              .value {
                display: flex;
                width: 400px;
                margin: auto;
                .value,
                .key {
                  border-bottom: 1px dashed #aaa;
                  padding: 4px;
                }
                .key {
                  flex: 0;
                  flex-basis: 100px;
                  text-align: right;
                  font-weight: bold;
                  padding-right: 20px;
                }
                .value {
                  flex: 1;
                }
              }
            }
            text-align: center;
          }
      `}</style>
    </div>
  );
};

export default CrontabInput;
