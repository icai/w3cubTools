import React, { useEffect, useRef } from "react";

const ButtonPanel: React.FC<{ onClick: (value: string) => void }> = ({ onClick }) => {

  const keyMapping: Record<string, HTMLButtonElement> = {};
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    target.classList.remove("clicked");
    setTimeout(() => {
      target.classList.add("clicked");
    }, 0);
    onClick(target.dataset.value || "");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = `${event.shiftKey ? "shift+" : ""}${event.keyCode || event.which}`;
    const button = keyMapping[key];

    if (button) {
      button.click();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  useEffect(() => {
    const buttons = buttonsRef.current?.querySelectorAll("button");
    if (buttons) {
      buttons.forEach((button) => {
        keyMapping[button.dataset.code || ""] = button;
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={buttonsRef} className="button-panel row">
      <div className="s3 column">
        <div className="s1 row">
          <button
            className="button s1"
            data-code="67"
            data-value="c"
            onClick={handleButtonClick}
          >
            C
          </button>
          <button
            className="button s1"
            data-code="8"
            data-value="back"
            onClick={handleButtonClick}
          >
            ←
          </button>
          <button
            className="button s1"
            data-code="191"
            data-value="/"
            onClick={handleButtonClick}
          >
            ÷
          </button>
        </div>
        <div className="s1 row">
          <button
            className="button s1"
            data-code="55"
            data-value="7"
            onClick={handleButtonClick}
          >
            7
          </button>
          <button
            className="button s1"
            data-code="56"
            data-value="8"
            onClick={handleButtonClick}
          >
            8
          </button>
          <button
            className="button s1"
            data-code="57"
            data-value="9"
            onClick={handleButtonClick}
          >
            9
          </button>
        </div>
        <div className="s1 row">
          <button
            className="button s1"
            data-code="52"
            data-value="4"
            onClick={handleButtonClick}
          >
            4
          </button>
          <button
            className="button s1"
            data-code="53"
            data-value="5"
            onClick={handleButtonClick}
          >
            5
          </button>
          <button
            className="button s1"
            data-code="54"
            data-value="6"
            onClick={handleButtonClick}
          >
            6
          </button>
        </div>
        <div className="s1 row">
          <button
            className="button s1"
            data-code="49"
            data-value="1"
            onClick={handleButtonClick}
          >
            1
          </button>
          <button
            className="button s1"
            data-code="50"
            data-value="2"
            onClick={handleButtonClick}
          >
            2
          </button>
          <button
            className="button s1"
            data-code="51"
            data-value="3"
            onClick={handleButtonClick}
          >
            3
          </button>
        </div>
        <div className="s1 row">
          <button
            className="button s2"
            data-code="48"
            data-value="0"
            onClick={handleButtonClick}
          >
            0
          </button>
          <button
            className="button s1"
            data-code="190"
            data-value="."
            onClick={handleButtonClick}
          >
            .
          </button>
        </div>
      </div>
      <div className="s1 column">
        <button
          className="button s1"
          data-code="shift+56"
          data-value="*"
          onClick={handleButtonClick}
        >
          ×
        </button>
        <button
          className="button s1"
          data-code="189"
          data-value="-"
          onClick={handleButtonClick}
        >
          -
        </button>
        <button
          className="button s1"
          data-code="187"
          data-value="+"
          onClick={handleButtonClick}
        >
          +
        </button>
        <button
          className="button s2 button-equal"
          data-code="13"
          data-value="="
          onClick={handleButtonClick}
        >
          =
        </button>
      </div>
      <style jsx>{`
          .button-panel {
            flex: 5;
            margin-right: 1px;
            .button {
              cursor: pointer;
              position: relative;
              margin: 0;
              padding: 0;
              border: none;
              background-color: #fafafa;
              font-size: 30px;
              line-height: 0px;
              text-align: center;
              color: #979ca4;
              overflow: hidden;
              border: 1px solid #e3e7e9;
              margin-top: -1px;
              margin-right: -1px;
              &:before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #aaa;
                opacity: 0;
              }
              &.clicked:before {
                animation: react-calculator-click 0.5s ease-out 0s 1 alternate
                  forwards;
              }
              &.button-equal {
                color: #fff;
                background-color: #fa722e;
              }
              &:focus {
                outline: none;
              }
            }
          }
        `}</style>
    </div>
  );
}
export default ButtonPanel
