import ConversionLayout from "@components/ConversionLayout";
import { Pane, Button, IconButton } from "evergreen-ui";
import { useLayoutEffect, useState } from "react";
import WriteCharactor from "@components/WriteCharactor";

import chinese from "@constants/chinese.json";
export default function() {
  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <Pane
        width="800px"
        display="flex"
        justifyContent="center"
        height="100%"
        marginX="auto"
      >
        <WriteCharactor size="600" dict={chinese}></WriteCharactor>
      </Pane>
    </ConversionLayout>
  );
}
