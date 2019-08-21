import ConversionPanel from "@components/ConversionPanel";
import { EditorPanelProps } from "@components/EditorPanel";
import Form, { InputType } from "@components/Form";
import { useSettings } from "@hooks/useSettings";
import { useCallback, useState } from "react";
import * as React from "react";
interface Settings {
  ts: boolean;
  flow: boolean;
}

const formFields = [
  {
    type: InputType.SWITCH,
    key: "ts",
    label: "Is Typescript"
  },
  {
    type: InputType.SWITCH,
    key: "flow",
    label: "Is Flow"
  }
];
export default function() {
  const name = "React to Vue";
  const [settings, setSettings] = useSettings(name, {
    ts: false,
    flow: false
  });
  const transformer = useCallback(
    ({ value }) => {
      if (value) {
        let [output, _results] = _w3cub_reactToVue(value, settings);
        return output;
      }
      return value;
    },
    [settings]
  );
  const getSettingsElement = useCallback<EditorPanelProps["settingElement"]>(
    ({ open, toggle }) => {
      return (
        <Form<Settings>
          title="React to Vue"
          onSubmit={setSettings}
          open={open}
          toggle={toggle}
          formsFields={formFields}
          initialValues={settings}
        />
      );
    },
    []
  );
  return (
    <ConversionPanel
      layoutHeight="700px"
      transformer={transformer}
      editorTitle="React"
      editorLanguage="html"
      editorDefaultValue={"react"}
      editorSettingsElement={getSettingsElement}
      settings={settings}
      resultTitle="Vue"
      resultLanguage={"javascript"}
    />
  );
}
