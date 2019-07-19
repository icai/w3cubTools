import React, { Component } from "react";
import GridCell from "./grid-cell";

export default class GridRow extends Component<any> {
  getChildren() {
    var children = [];
    for (var i = 0; i < this.props.size; i++)
      children.push(<GridCell key={i} />);
    return children;
  }

  render() {
    return <div className="grid-row">{this.getChildren()}</div>;
  }
}
