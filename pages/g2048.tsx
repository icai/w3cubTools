import React, { PureComponent, Fragment } from "react";

import Container from "@components/g2048/container";
import "@components/g2048/index.less";
export default function() {
  if (__CLIENT__) {
    return <Container size="4" startTiles="2" />;
  } else {
    return null;
  }
}
