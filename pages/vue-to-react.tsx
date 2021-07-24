import ConversionPanel from "@components/ConversionPanel";
import { EditorPanelProps } from "@components/EditorPanel";
import Form, { InputType } from "@components/Form";
import { useSettings } from "@hooks/useSettings";
import { useCallback, useState } from "react";
import * as React from "react";
interface Settings {
  auto: boolean;
  sfc: boolean;
}

const formFields = [
  {
    type: InputType.SWITCH,
    key: "auto",
    label: "Auto detect Single File Components"
  },
  {
    type: InputType.SWITCH,
    key: "sfc",
    label: "Is Single File Components"
  }
];
export default function VuetoReact() {
  const name = "Vue to React";
  const [settings, setSettings] = useSettings(name, {
    auto: true,
    sfc: false
  });
  const transformer = useCallback(
    async ({ value }) => {
      if (value) {
        if (settings.auto) {
          if (/\<(script|template)\>/g.test(value)) {
            return _w3cub_vueToReact(value, true);
          } else {
            return _w3cub_vueToReact(value, false);
          }
        } else {
          return _w3cub_vueToReact(value, settings.sfc);
        }
      }
      return value;
    },
    [settings]
  );
  const getSettingsElement = useCallback<EditorPanelProps["settingElement"]>(
    ({ open, toggle }) => {
      return (
        <Form<Settings>
          title="Vue to React"
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
      editorTitle="Vue"
      editorLanguage="html"
      editorDefaultValue={"vue"}
      editorSettingsElement={getSettingsElement}
      settings={settings}
      resultTitle="React"
      resultLanguage={"javascript"}
    />
  );
}
