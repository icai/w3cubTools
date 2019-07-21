import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";

export default function() {
  return (
    <ConversionLayout
      transformer={({ value, setResult, result, setValue }) => {
        return (
          <>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(escape(value))}
            >
              Escape加密
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(unescape(value))}
            >
              Unescape解密
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                setResult(value);
                setValue(result);
              }}
            >
              内容交换
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
      editorTitle="JS Object"
      defaultValue="https://www.google.com/"
    />
  );
}
