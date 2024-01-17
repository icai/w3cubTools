import React, { Component } from "react";
import { ReactTile as Tile } from "./tile";

export default class TileContainer extends React.Component<any> {
  getChildren() {
    var children = [] as any[];
    this.props.tiles.forEach(function(item) {
      children.push(
        <Tile x={item.x} y={item.y} value={item.value} key={item.prog} />
      );
    });
    return children;
  }
  render() {
    return <div className="tile-container">{this.getChildren()}</div>;
  }
}
