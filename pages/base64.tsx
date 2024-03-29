import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";
import decode from "@utils/crypto";

export default function Tbase64() {
  return (
    <ConversionLayout
      flexDirection="column"
      transformer={({ value, setResult, result, setValue }) => {
        return (
          <>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.base64_encode(value))}
            >
              Base64 Encode
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.base64_decode(value))}
            >
              Base64 Decode
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                setResult(value);
                setValue(result || "");
              }}
            >
              Content Exchange
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
              Empty All
            </Button>
          </>
        );
      }}
      defaultValue="https://www.google.com/"
    />
  );
}
