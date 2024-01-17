import React, { Component } from "react";
import PropTypes from "prop-types";
import cronstrue from "cronstrue/i18n";
import Cron from "cron-converter";
import valueHints from "./valueHints";
// import "./crontab-input.less";
import locales from "./locales";

class CrontabInput extends Component {
  state = {
    parsed: {},
    highlightedExplanation: "",
    isValid: true,
    selectedPartIndex: -1,
    nextSchedules: [],
    nextExpanded: false,
    seleted: {
      selectedPart: -1,
      selectedDirectly: false
    }
  };
  inputRef;

  lastCaretPosition = -1;

  UNSAFE_componentWillMount() {
    this.calculateNext();
    this.calculateExplanation();
  }

  clearCaretPosition() {
    this.lastCaretPosition = -1;
    this.setState({
      selectedPartIndex: -1
      // highlightedExplanation: this.highlightParsed(-1)
    });
  }

  calculateNext() {
    let nextSchedules = [];
    try {
      let cronInstance = new Cron();
      cronInstance.fromString(this.props.value);
      let timePointer = +new Date();
      for (let i = 0; i < 5; i++) {
        let schedule = cronInstance.schedule(timePointer);
        let next = schedule.next();
        nextSchedules.push(next.format("YYYY-MM-DD HH:mm:ss"));
        timePointer = +next + 1000;
      }
    } catch (e) {}
    this.setState({ nextSchedules });
  }

  highlightParsed(selectedPartIndex) {
    let parsed = this.state.parsed;
    if (!parsed) {
      return;
    }
    let toHighlight = [];
    let highlighted = "";

    for (let i = 0; i < 5; i++) {
      if (parsed.segments[i] && parsed.segments[i].text) {
        toHighlight.push({ ...parsed.segments[i] });
      } else {
        toHighlight.push(null);
      }
    }

    if (selectedPartIndex >= 0) {
      if (toHighlight[selectedPartIndex]) {
        toHighlight[selectedPartIndex].active = true;
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

    toHighlight = toHighlight.filter(_ => _);

    toHighlight.sort((a, b) => {
      return a.start - b.start;
    });

    let pointer = 0;
    toHighlight.forEach(item => {
      if (pointer > item.start) {
        return;
      }
      highlighted += parsed.description.substring(pointer, item.start);
      pointer = item.start;
      highlighted += `<span${
        item.active ? ' class="active"' : ""
      }>${parsed.description.substring(
        pointer,
        pointer + item.text.length
      )}</span>`;
      pointer += item.text.length;
    });

    highlighted += parsed.description.substring(pointer);

    return highlighted;
  }

  calculateExplanation(callback) {
    let isValid = true;
    let parsed;
    let highlightedExplanation;
    try {
      parsed = cronstrue.toString(this.props.value, {
        locale: this.props.locale,
        use24HourTimeFormat: true
      });
      highlightedExplanation = parsed;
    } catch (e) {
      highlightedExplanation = e.toString();
      isValid = false;
    }
    this.setState(
      {
        parsed,
        highlightedExplanation,
        isValid
      },
      () => {
        if (isValid) {
          // this.setState({
          //   highlightedExplanation: this.highlightParsed(-1)
          // });
        }
        if (callback) {
          callback();
        }
      }
    );
  }

  onCaretPositionChange() {
    if (!this.inputRef) {
      return;
    }
    let caretPosition = this.inputRef.selectionStart;
    let selected = this.props.value.substring(
      this.inputRef.selectionStart,
      this.inputRef.selectionEnd
    );
    if (selected.indexOf(" ") >= 0) {
      caretPosition = -1;
    }
    if (this.lastCaretPosition === caretPosition) {
      return;
    }
    this.lastCaretPosition = caretPosition;
    if (caretPosition === -1) {
      this.setState({
        // highlightedExplanation: this.highlightParsed(-1),
        selectedPartIndex: -1
      });
      return;
    }
    let textBeforeCaret = this.props.value.substring(0, caretPosition);
    let selectedPartIndex = textBeforeCaret.split(" ").length - 1;
    this.setState({
      // highlightedExplanation: this.highlightParsed(selectedPartIndex),
      selectedPartIndex
    });
  }

  getLocale() {
    return locales[this.props.locale];
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      setTimeout(() => {
        this.calculateExplanation(() => {
          this.onCaretPositionChange();
          this.calculateNext();
        });
      });
    }
  }

  selectPart(index) {
    const me = this;
    this.setState({
      selectedPartIndex: index
    });
    let e = {
      selectedPart: index + 1,
      text: this.props.value
    };
    let t = this.state.seleted;
    let inputRef = this.inputRef;
    setTimeout(function() {
      return (function(e, t) {
        if (
          e.selectedPart &&
          e.selectedPart !== t.selectedPart &&
          !e.selectedDirectly
        ) {
          var n = e.text.split(" ").slice(0, e.selectedPart),
            r = n.pop().length,
            o = n.join(" ").length;
          0 < o && (o += 1);
          var a = inputRef;
          (a.selectionStart = o), (a.selectionEnd = o + r), a.focus();
        }
        me.setState({
          ["seleted.selectedPart"]: index + 1
        });
      })(e, t);
    }, 0);
  }

  render() {
    return (
      <div className="crontab-input">
        <div
          className="explanation"
          dangerouslySetInnerHTML={{
            __html: this.state.isValid
              ? `“${this.state.highlightedExplanation}”`
              : "　"
          }}
        />

        <div className="next">
          {!!this.state.nextSchedules.length && (
            <span>
              {this.getLocale().nextTime}: {this.state.nextSchedules[0]}{" "}
              {this.state.nextExpanded ? (
                <a onClick={() => this.setState({ nextExpanded: false })}>
                  ({this.getLocale().hide})
                </a>
              ) : (
                <a onClick={() => this.setState({ nextExpanded: true })}>
                  ({this.getLocale().showMore})
                </a>
              )}
              {!!this.state.nextExpanded && (
                <div className="next-items">
                  {this.state.nextSchedules.slice(1).map((item, index) => (
                    <div className="next-item" key={index}>
                      {this.getLocale().then}: {item}
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
            className={"cron-input " + (!this.state.isValid ? "error" : "")}
            value={this.props.value}
            ref={ref => {
              this.inputRef = ref;
            }}
            onMouseUp={e => {
              this.onCaretPositionChange();
            }}
            onKeyUp={e => {
              this.onCaretPositionChange();
            }}
            onBlur={e => {
              this.clearCaretPosition();
            }}
            onChange={e => {
              let parts = e.target.value.split(" ").filter(_ => _);
              if (parts.length !== 5) {
                this.props.onChange(e.target.value);
                this.setState({
                  parsed: {},
                  isValid: false
                });
                return;
              }

              this.props.onChange(e.target.value);
            }}
          />
        </div>

        <div className="parts">
          {[
            this.getLocale().minute,
            this.getLocale().hour,
            this.getLocale().dayMonth,
            this.getLocale().month,
            this.getLocale().dayWeek
          ].map((unit, index) => (
            <div
              key={index}
              className={
                "part " +
                (this.state.selectedPartIndex === index ? "selected" : "")
              }
              onClick={() => {
                this.selectPart(index);
              }}
            >
              {unit}
            </div>
          ))}
        </div>

        {valueHints[this.props.locale][this.state.selectedPartIndex] && (
          <div className="allowed-values">
            {valueHints[this.props.locale][this.state.selectedPartIndex].map(
              (value, index) => (
                <div className="value" key={index}>
                  <div className="key">{value[0]}</div>
                  <div className="value">{value[1]}</div>
                </div>
              )
            )}
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
  }
}

CrontabInput.propTypes = {
  locale: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

CrontabInput.defaultProps = {
  locale: "en"
};

export default CrontabInput;
