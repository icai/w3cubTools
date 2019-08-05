import { Pane, Button, Textarea } from "evergreen-ui";
import { useState } from "react";

export default function() {
  const [result, setResult] = useState("");
  const [howManyResuls, setHowMany] = useState(10 as any);
  const [howManyDigits, setHowDig] = useState(32 as any);

  const generate = () => {
    var str = "";
    for (var i = 0; i < howManyResuls; i++) {
      var res = "";
      for (var j = 0; j < howManyDigits; j++) {
        // @ts-ignore
        var randByte = parseInt(Math.random() * 16, 10).toString(16);
        res += randByte;
      }
      str += res;
      str += "\n";
    }
    return str;
  };
  return (
    <Pane>
      <Pane height="500px;">
        <Textarea
          height="100%"
          id="textarea-2"
          value={result}
          onChange={() => {}}
        />
      </Pane>
      <Pane marginTop="10px">
        <Button
          marginRight={10}
          height={40}
          width={300}
          textAlign="center"
          display="inline-block"
          fontSize="20px"
          whiteSpace="nowrap"
          onClick={() => {
            setResult(generate());
          }}
        >
          Random Hex
        </Button>
        <span className="sp">
          Hex length:
          <input
            type="range"
            name="hex"
            min="5"
            max="99"
            className="range"
            value={howManyDigits}
            onChange={e => {
              setHowDig(e.target.value);
            }}
          ></input>
          <input
            type="text"
            name="text"
            className="txt"
            onChange={e => {
              setHowDig(e.target.value);
            }}
            value={howManyDigits}
            id=""
          />
        </span>

        <span className="sp">
          Result size:
          <input
            type="range"
            name="size"
            min="5"
            max="99"
            className="range"
            value={howManyResuls}
            onChange={e => {
              setHowMany(e.target.value);
            }}
          ></input>
          <input
            type="text"
            name="text"
            className="txt"
            onChange={e => {
              setHowMany(e.target.value);
            }}
            value={howManyResuls}
            id=""
          />
        </span>
      </Pane>
      <style jsx>{`
        .txt {
          height: 40px;
          width: 40px;
          text-align: center;
        }
        .sp {
          margin-right: 5px;
          margin-left: 10px;
        }
        .sp * {
          margin-left: 5px;
        }
        .range {
          width: 150px;
        }
      `}</style>
    </Pane>
  );
}
