import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";
import {
  SHA1,
  SHA256,
  SHA512
} from "crypto-js";
export default function ShaEncode() {
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
              onClick={() => setResult(SHA1(value).toString())}
            >
              SHA1 Encode
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(SHA256(value).toString())}
            >
              SHA256 Encode
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(SHA512(value).toString())}
            >
              SHA512 Encode
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
