import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";

export default function() {
  return (
    <ConversionLayout
      layoutHeight="700px"
      flexDirection="row"
      transformer={({ value, setResult, result, setValue }) => {
        return (
          <>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                var str = value.trim();
                // data:image/png;base64
                if (str.substring(0, 4) != "data") {
                  str = "data:image/png;base64," + str;
                }
                setResult(str);
              }}
            >
              Generate Image
            </Button>
            <Button
              is="a"
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              download="image.jpg"
              href={result}
            >
              Download Image
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
      defaultValue=""
      resultRender={({ result }) => {
        if (result) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
              }}
            >
              <img src={result} className="" />
            </div>
          );
        }
        return null;
      }}
    />
  );
}
