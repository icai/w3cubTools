import React, { Component } from "react";
import GridRow from "./grid-row";

export default class GridContainer extends Component<any> {
  getChildren() {
    var children = [];
    for (var i = 0; i < this.props.size; i++)
      children.push(<GridRow size={this.props.size} key={i} />);
    return children;
  }
  render() {
    return <div className="grid-container">{this.getChildren()}</div>;
  }
}
