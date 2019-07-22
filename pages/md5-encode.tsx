import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";
import decode from "@utils/crypto";

export default function() {
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
              onClick={() => setResult(decode.md5(value))}
            >
              MD5 Encode
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(decode.sha1(value))}
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
