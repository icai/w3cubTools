import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";
import { escape, unescape, ucfirst } from "@utils/escape";

interface EscapeConverterProps {
  type: string;
  name?: string;
  flexDirection?: "row" | "column";
  defaultValue?: string;
}

export const EscapeConverter: React.FunctionComponent<EscapeConverterProps> = ({
  type,
  name,
  flexDirection = "row",
  defaultValue = ""
}) => {
  name = name || ucfirst(type);
  return (
    <ConversionLayout
      flexDirection={flexDirection}
      transformer={({ value, setResult, result, setValue }) => {
        return (
          <>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(escape(type, value))}
            >
              {name} Escape
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => setResult(unescape(type, value))}
            >
              {name} Unescape
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
            {defaultValue && (
              <Button
                marginRight={10}
                height={40}
                margin="5px"
                display="block"
                whiteSpace="nowrap"
                onClick={() => {
                  setValue(defaultValue);
                }}
              >
                Get Example
              </Button>
            )}
          </>
        );
      }}
      defaultValue={defaultValue}
    />
  );
};
