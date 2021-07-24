import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import BabelWorker from "@workers/babel.worker";
import { getWorker } from "@utils/workerWrapper";
import { BabelTransforms } from "@constants/babelTransforms";
import PrettierWorker from "@workers/prettier.worker";

let babelWorker, prettier;
export default function JsDeobfuscate() {
  const transformer = useCallback(async ({ value }) => {
    babelWorker = babelWorker || getWorker(BabelWorker);
    prettier = prettier || getWorker(PrettierWorker);

    const _value = await babelWorker.send({
      type: BabelTransforms.JS_DEOBFUSCATE,
      value
    });

    return prettier.send({
      language: "javascript",
      value: _value
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="Obfuscate Code"
      editorLanguage="javascript"
      resultTitle="Deobfuscate Result"
      resultLanguage={"javascript"}
      editorDefaultValue="obfuscate"
    />
  );
}
