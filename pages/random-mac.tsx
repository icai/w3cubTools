import { Pane, Button, Textarea } from "evergreen-ui";
import { useState } from "react";
export default function RandomMac() {
  const [result, setResult] = useState("");
  const [howManyResuls, setHowMany] = useState(10 as any);
  var startIp = "00:00:00:00:00:00";
  var endIp = "ff:ff:ff:ff:ff:ff";

  const generate = () => {
    function randRange(low, high) {
      // @ts-ignore
      return parseInt(
        // @ts-ignore
        parseInt(low, 16) +
          Math.random() * (parseInt(high, 16) - parseInt(low, 16)),
        16
      );
    }
    var str = "";
    for (var i = 0; i < howManyResuls; i++) {
      var r1 = randRange(startIp.split(":")[0], endIp.split(":")[0]).toString(
        16
      );
      r1 = parseInt(r1, 10).toString(16);
      if (r1.length == 1) {
        r1 = "0" + r1;
      }
      var r2 = randRange(startIp.split(":")[1], endIp.split(":")[1]).toString(
        16
      );
      r2 = parseInt(r2, 10).toString(16);
      if (r2.length == 1) {
        r2 = "0" + r2;
      }
      var r3 = randRange(startIp.split(":")[2], endIp.split(":")[2]).toString(
        16
      );
      r3 = parseInt(r3, 10).toString(16);
      if (r3.length == 1) {
        r3 = "0" + r3;
      }
      var r4 = randRange(startIp.split(":")[3], endIp.split(":")[3]).toString(
        16
      );
      r4 = parseInt(r4, 10).toString(16);
      if (r4.length == 1) {
        r4 = "0" + r4;
      }
      var r5 = randRange(startIp.split(":")[4], endIp.split(":")[4]).toString(
        16
      );
      r5 = parseInt(r5, 10).toString(16);
      if (r5.length == 1) {
        r5 = "0" + r5;
      }
      var r6 = randRange(startIp.split(":")[5], endIp.split(":")[5]).toString(
        16
      );
      r6 = parseInt(r6, 10).toString(16);
      if (r6.length == 1) {
        r6 = "0" + r6;
      }
      str += r1 + ":" + r2 + ":" + r3 + ":" + r4 + ":" + r5 + ":" + r6;
      if (i != howManyResuls - 1) str += "\n";
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
          Random Mac
        </Button>
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
