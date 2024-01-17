import { Pane, Alert, Spinner } from "evergreen-ui";
import EditorPanel, { EditorPanelProps } from "@components/EditorPanel";
import * as React from "react";
import { useEffect, useState } from "react";
import { Language, useData } from "@hooks/useData";
import { useRouter } from "next/router";
import { activeRouteData } from "@utils/routes";
import PrettierWorker from "@workers/prettier.worker";
import { getWorker } from "@utils/workerWrapper";
import Mdloader from "@components/Mdloader";

let prettierWorker: any; // Add type declaration for prettierWorker

function getEditorLanguage(lang: Language) {
  const mapping: Record<string, string> = {
    flow: "typescript"
  };

  return mapping[lang] || lang;
}

export type Transformer = (args: {
  value: string;
  splitEditorValue?: string;
}) => Promise<string>;

export interface ConversionPanelProps {
  splitTitle?: string;
  splitLanguage?: Language;
  editorTitle: string;
  editorLanguage: Language;
  editorDefaultValue?: string;
  resultTitle: React.ReactNode;
  resultLanguage: Language;
  splitEditorProps?: Partial<EditorPanelProps>;
  splitEditorDefaultValue?: string;
  editorProps?: Partial<EditorPanelProps>;
  resultEditorProps?: Partial<EditorPanelProps>;
  transformer: Transformer;
  defaultSplitValue?: string;
  editorSettingsElement?: EditorPanelProps["settingElement"];
  resultSettingsElement?: EditorPanelProps["settingElement"];
  settings?: any;
  layoutHeight?: string;
}

const ConversionPanel: React.FunctionComponent<ConversionPanelProps> = function ({
  splitEditorProps,
  editorProps,
  resultEditorProps,
  transformer,
  splitLanguage,
  splitTitle,
  editorLanguage,
  editorTitle,
  resultLanguage,
  resultTitle,
  editorSettingsElement,
  settings,
  editorDefaultValue,
  splitEditorDefaultValue = '',
  resultSettingsElement,
  layoutHeight
}) {
  const [value, setValue] = useData(editorDefaultValue || editorLanguage);
  const [splitValue, setSplitValue] = useData(
    splitEditorDefaultValue || splitLanguage || ''
  );
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [showUpdateSpinner, toggleUpdateSpinner] = useState(false);

  const router = useRouter();
  const route = activeRouteData(router.pathname);

  let packageDetails: { name: string; url: string } | undefined;

  if (route) {
    const { packageUrl, packageName } = route;

    packageDetails =
      packageName && packageUrl
        ? {
          name: packageName,
          url: packageUrl
        }
        : undefined;
  }

  useEffect(() => {
    async function transform() {
      try {
        toggleUpdateSpinner(true);
        prettierWorker = prettierWorker || getWorker(PrettierWorker);

        const result = await transformer({
          value,
          splitEditorValue: splitTitle ? splitValue : undefined
        });

        let prettyResult = await prettierWorker.send({
          value: result,
          language: resultLanguage
        });

        // Fix for #319
        if (prettyResult.startsWith(";<")) {
          prettyResult = prettyResult.slice(1);
        }
        setResult(prettyResult);
        setMessage("");
      } catch (e) {
        console.error(e);
        setMessage(e.message);
      }
      toggleUpdateSpinner(false);
    }

    transform();
  }, [splitValue, value, splitTitle, settings]);

  if (!layoutHeight) {
    if (
      splitTitle ||
      (editorProps && editorProps.previewElement) ||
      (resultEditorProps && resultEditorProps.previewElement)
    ) {
      layoutHeight = "700px";
    } else {
      layoutHeight = "500px";
    }
  }
  return (
    <>
      <Pane
        display="flex"
        flexDirection="row"
        overflow="hidden"
        flex={1}
        height={layoutHeight}
        border="1px solid #E4E7EB"
      >
        <Pane
          display="flex"
          flex={1}
          borderRight="1px solid #E4E7EB"
          flexDirection="column"
          overflow="hidden"
        >
          <EditorPanel
            language={getEditorLanguage(editorLanguage)}
            onChange={setValue}
            hasLoad
            defaultValue={value}
            id={'1'}
            hasCopy={false}
            title={editorTitle}
            settingElement={editorSettingsElement}
            hasClear
            {...editorProps}
          />

          {splitTitle && (
            <Pane display="flex" flex={1} borderTop="1px solid #E4E7EB">
              <EditorPanel
                title={splitTitle}
                defaultValue={splitValue}
                language={getEditorLanguage(splitLanguage || '')}
                id={'2'}
                hasCopy={false}
                onChange={setSplitValue}
                hasLoad
                hasClear
                {...splitEditorProps}
              />
            </Pane>
          )}
        </Pane>
        <Pane display="flex" flex={1} position="relative">
          {showUpdateSpinner && (
            <Pane
              display="inline-flex"
              position="absolute"
              backgroundColor="#fff"
              zIndex={9}
              borderRadius={"50%"}
              paddingX={8}
              paddingY={8}
              elevation={1}
              top={50}
              right={30}
            >
              <Spinner color="#0e7ccf" size={32} />
            </Pane>
          )}
          <EditorPanel
            title={resultTitle}
            defaultValue={result}
            language={getEditorLanguage(resultLanguage)}
            id={'3'}
            editable={false}
            hasPrettier={false}
            settingElement={resultSettingsElement}
            packageDetails={packageDetails}
            {...resultEditorProps}
          />
        </Pane>
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
