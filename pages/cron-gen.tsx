import CrontabInput from "@components/CrontabInput";
import ConversionLayout from "@components/ConversionLayout";
import React, { useCallback, useState, Fragment } from "react";
import { Button, Pane, FilePicker, Textarea } from "evergreen-ui";

export default function() {
  const [crons, setCrons] = useState({ value1: "* * * * *" });
  const onChange = (obj: object) => {
    setCrons({
      ...crons,
      ...obj
    });
  };
  return (
    <ConversionLayout flexDirection="column" layoutHeight="600px">
      <Pane>
        {/* locale={"zh_CN"} */}
        <CrontabInput
          value={crons.value1}
          onChange={value => onChange({ value1: value })}
        />
      </Pane>
    </ConversionLayout>
  );
}
