import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";
import * as decode from "@utils/decode";

export default function UnicodetoAscii() {
  return (
    <ConversionLayout
      flexDirection="column"
      transformer={({ value, setResult, setValue }) => {
        return (
          <>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.decodeString(value))}
            >
              Unicode转中文
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.decodeConText(value))}
            >
              Unicode转中文(引号字符串上下文)
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.unicodeString(value))}
            >
              中文转Unicode
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.cnChar2EnChar(value))}
            >
              中文符号转英文符号
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              intent="danger"
              appearance="primary"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                setResult("");
                setValue("");
              }}
            >
              清空结果
            </Button>
          </>
        );
      }}
      defaultValue="https://www.google.com/"
    />
  );
}
