//@ts-ignore
import { Pane, Alert, Textarea } from "evergreen-ui";
import { EditorPanelProps } from "@components/EditorPanel";
import * as React from "react";
import { useState } from "react";
import { Language } from "@hooks/useData";
import { useRouter } from "next/router";
import Mdloader from "@components/Mdloader";

export type Transformer = (args: {
  value: string;
  result?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}) => JSX.Element;

export interface ConversionLayoutProps {
  splitTitle?: string;
  splitLanguage?: Language;
  editorTitle?: string;
  editorLanguage?: Language;
  defaultValue?: string;
  resultTitle?: React.ReactNode;
  resultLanguage?: Language;
  splitEditorProps?: Partial<EditorPanelProps>;
  splitEditorDefaultValue?: string;
  editorProps?: Partial<EditorPanelProps>;
  resultEditorProps?: Partial<EditorPanelProps>;
  transformer?: Transformer;
  resultRender?: Transformer;
  defaultSplitValue?: string;
  settings?: any;
  flexDirection?: "row" | "column";
  layoutHeight?: string;
  children?: React.ReactNode;
}

const ConversionPanel: React.FunctionComponent<ConversionLayoutProps> = function({
  transformer,
  resultRender,
  flexDirection = "row",
  layoutHeight = "500px",
  defaultValue,
  children
}) {
  const [value, setValue] = useState(defaultValue);

  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const defFlexProps = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    flexWrap: "wrap",
    height: layoutHeight
  };
  const defChildProps = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    flexWrap: "wrap",
    height: "100%"
  };
  const defControlProps = {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 5%",
    flexWrap: "wrap",
    height: "100%",
    padding: "10px"
  };
  let flexProps = {};
  let controlProps = {};
  let childProps = {};
  if (flexDirection == "column") {
    flexProps = {
      ...defFlexProps,
      flexDirection: "column"
    };
    childProps = {
      ...defChildProps,
      flexDirection: "column"
    };
    controlProps = {
      ...defControlProps,
      flexDirection: "row"
    };
  } else {
    flexProps = {
      ...defFlexProps,
      flexDirection: "row"
    };
    childProps = {
      ...defChildProps,
      flexDirection: "column"
    };
    controlProps = {
      ...defControlProps,
      flexDirection: "column"
    };
  }

  const resultSt = resultRender ? { border: "2px solid #ccc" } : {};
  const resultOptions = { ...childProps };
  return (
    <>
      <Pane {...flexProps}>
        {!children && (
          <>
            <Pane {...childProps}>
              <Textarea
                height="100%"
                id="textarea-1"
                placeholder="typing your content"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </Pane>
            <Pane {...controlProps}>
              {transformer({
                value,
                result,
                setValue,
                setResult
              })}
            </Pane>
            <Pane {...resultOptions} style={resultSt}>
              {resultRender &&
                resultRender({
                  value,
                  result,
                  setValue,
                  setResult
                })}
              {!resultRender && (
                <Textarea
                  height="100%"
                  id="textarea-2"
                  placeholder="get your result"
                  value={result}
                  onChange={e => setResult(e.target.value)}
                />
              )}
            </Pane>
          </>
        )}
        {children && children}
      </Pane>
      <div className="clearfix"></div>
      <Mdloader />
      {message && (
        <Alert
          paddingY={15}
          paddingX={20}
          left={240}
          right={0}
          position="absolute"
          intent="danger"
          bottom={0}
          title={message}
          backgroundColor="#FAE2E2"
          zIndex={3}
        />
      )}
    </>
  );
};

export default React.memo(ConversionPanel);
