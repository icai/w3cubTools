import colors from "@constants/open-color.json";
import useClipboard from "@/hooks/useClipboard";
const colorsIndex = Object.keys(colors);
const ColorItem = props => {
  const { color, i, co } = props;
  const { hasCopied, onCopy } = useClipboard(co, { timeout: 800 });
  return (
    <div className="color-chip" id={`${color}-${i}`}>
      <div
        className={`color-chip-bg bg-${color}-${i}`}
        onClick={() => {
          onCopy()
        }}
        style={{ backgroundColor: co }}
      >
        {hasCopied && <div className="copy-text">{co}</div>}
      </div>
      <div className="color-name">{`${color} ${i}`}</div>
      <input className="color-hex" type="text" readOnly value={co} />
      <style jsx>{`
        .color-chip {
          margin-bottom: 40px;
          line-height: 1.25;
          position: relative;
          min-height: 1px;
          padding-right: 2px;
          padding-left: 2px;
          float: left;
          width: 10%;
        }
        .color-chip input[type="text"] {
          border: none;
          font-family: "Roboto Mono", monospace;
          background-color: transparent;
        }

        .color-name {
          padding: 14px 3px 2px;
          text-transform: uppercase;
          text-align: left;
          font-size: 14px;
          font-weight: 500;
        }

        .color-hex {
          padding: 2px 3px;
          width: 100%;
          font-size: 14px;
          color: #868e96;
          line-height: 1.3;
        }

        .color-chip-bg {
          height: 80px;
          border-radius: 2px;
          position: relative;
          cursor: pointer;
        }

        .color-chip-bg span {
          position: absolute;
          top: 0;
          left: 0;
          margin: 10px;
          font-size: 12px;
          text-transform: uppercase;
        }

        @keyframes copyText {
          0% {
            opacity: 0;
            transform: translateY(0px);
          }
          30% {
            opacity: 0.5;
          }
          70% {
            transform: translateY(20px);
            opacity: 0.3;
          }
          100% {
            opacity: 0;
          }
        }
        .copy-text {
          text-aligin: center;
          animation: copyText 0.8s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default function OpenColor() {
  return (
    <div className="color-box">
      <div className="shortcut-wrap">
        <ul className="shortcut-menus">
          {colorsIndex.map(color => {
            return (
              <li key={color}>
                <a className={`shortcut ${color}`} href={`#${color}`}>
                  <span
                    className={`list-color list-color-${color}`}
                    style={{ backgroundColor: colors[color][7] }}
                  ></span>
                  {color}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <section className="color-wrap">
        {colorsIndex.map(color => {
          return (
            <section className="color-group" key={color} id={color}>
              <h3 className="color-title">{color}</h3>
              <div className="color-chips-wrap">
                <div className="color-chips clearfix">
                  {colors[color].map((co, i) => {
                    return (
                      <ColorItem
                        key={co}
                        co={co}
                        i={i}
                        color={color}
                      ></ColorItem>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </section>
      <style jsx>{`
        .color-box {
          padding: 0 30px;
          color: #495057;
        }
        .shortcut-wrap {
          padding: 20px 0;
        }
        .shortcut-wrap .shortcut-menus {
          list-style: none;
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
          height: 110px;
          column-count: 5;
          li + li {
            margin-top: 0.25em;
          }
        }

        .shortcut-wrap a.shortcut {
          display: block;
          padding: 6px 0;
          width: 100%;
          font-size: 12px;
          color: #868e96;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.2s ease-out;
          line-height: 18px;
          text-decoration: none;
        }
        .shortcut-wrap a.shortcut .list-color {
          display: inline-block;
          margin-top: -2px;
          margin-right: 10px;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          vertical-align: middle;
        }
        .color-group {
          padding-top: 20px;
        }

        .color-title {
          margin: 0 0 15px;
          font-size: 24px;
          text-transform: capitalize;
          font-weight: 700;
          line-height: 1.5;
        }

        .color-title span {
          margin-right: 0.5em;
        }

        .color-chips {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
