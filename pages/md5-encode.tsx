import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";
import {
  MD5,
  SHA1
} from "crypto-js";

export default function Md5Encode() {
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
              onClick={() => setResult(MD5(value).toString())}
            >
              MD5 Encode
            </Button>
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
