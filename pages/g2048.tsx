import React, { PureComponent, Fragment } from "react";

import Container from "@components/g2048/container";
import ConversionLayout from "@components/ConversionLayout";
import "@components/g2048/index.less";
export default function() {
  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <Container size="4" startTiles="2" />
    </ConversionLayout>
  );
}
