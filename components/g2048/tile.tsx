import React from "react";
import classnames from "classnames";

class _Tile extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      previousPosition: null,
      mergedFrom: null,
      isNew: true
    };
  }
  render() {
    // @ts-ignore
    var classnames_ = classnames(
      "tile",
      "tile-" + this.props.value,
      ["tile-position", this.props.x + 1, this.props.y + 1].join("-"),
      {
        "tile-new": this.state.isNew
      }
    );
    return (
      <div className={classnames_}>
        {" "}
        <div className="tile-inner"> {this.props.value}</div>
      </div>
    );
  }
  componentDidUpdate(prevProps: { x: any; y: any }) {
    if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) {
      this.setState({
        previosuPosition: {
          x: this.props.x,
          y: this.props.y
        },
        isNew: false
      });
    }
  }
}

var _prog = 0;
class Tile {
  previousPosition: { x: any; y: any } | null;
  x: any;
  y: any;
  value: number;
  mergedFrom: null;
  prog: number;
  constructor(position: { x: any; y: any }, value: number) {
    this.x = position.x;
    this.y = position.y;
    this.value = value || 2;

    this.previousPosition = null;
    this.mergedFrom = null; // Tracks tiles that merged together
    this.prog = _prog++;
  }
  savePosition() {
    this.previousPosition = { x: this.x, y: this.y };
  }

  updatePosition(position: { x: any; y: any }) {
    this.x = position.x;
    this.y = position.y;
  }

  serialize() {
    return {
      position: {
        x: this.x,
        y: this.y
      },
      value: this.value
    };
  }
}

export { Tile, _Tile as ReactTile };
