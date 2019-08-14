import React from "react";
import classNames from "classnames";
// import Button from './Button'
import Divide from "./Divide";
import { Button, Dialog } from "evergreen-ui";
import { createImage } from "../tools/imageCreater";
import "../style/modal.css";

/**
 * 显示图片转字符结果的模态框
 *
 * @export
 * @class FramesModal
 * @extends {React.PureComponent}
 */
export default class FramesModal extends React.PureComponent {
  /**
   * @typedef Frame
   * @prop {ImageData} data
   * @prop {string[]} text
   * @prop {number} delay
   */

  /**
   * Creates an instance of FramesModal.
   *
   * @param {object} props
   * @param {Frame[]} props.frames
   * @param {File} props.file
   *
   * @memberof FramesModal
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      color: "#000000",
      bgColor: "#ffffff",
      frameIndex: 0
    };
    this.playTimer = null;
    this.outputRef = React.createRef();
  }

  componentWillUnmount() {
    // 组件销毁时，取消定时器
    this.stop();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.file) {
      // 更换文件时，将播放帧序号重置回0
      return {
        frameIndex: 0
      };
    }
    return null;
  }

  /**
   * 保存图片为文件
   *
   * @memberof FramesModal
   */
  savePic = () => {
    const createOption = {
      div: this.outputRef.current,
      frames: this.props.frames,
      file: this.props.file,
      color: this.state.color,
      bgColor: this.state.bgColor
    };
    createImage(createOption);
  };

  setColor = ev => {
    this.setState({
      color: ev.target.value
    });
  };

  setBgColor = ev => {
    this.setState({
      bgColor: ev.target.value
    });
  };

  /**
   * 播放gif图像
   *
   * @memberof FramesModal
   */
  play() {
    // 不播放只有一帧的图片（非gif）
    if (this.props.frames.length <= 1) {
      return;
    }
    const nextFrame = () => {
      const delay = this.props.frames[this.state.frameIndex].delay;
      this.playTimer = setTimeout(() => {
        let nextIndex = this.state.frameIndex + 1;
        if (nextIndex === this.props.frames.length) {
          nextIndex = 0;
        }
        this.setState(
          {
            frameIndex: nextIndex
          },
          nextFrame
        );
      }, delay);
    };
    nextFrame();
  }

  /**
   * 停止播放gif图像
   *
   * @memberof FramesModal
   */
  stop() {
    if (this.playTimer) {
      clearTimeout(this.playTimer);
    }
  }

  close = ev => {
    ev.preventDefault();
    this.stop();
    this.setState({
      open: false
    });
  };

  open = () => {
    this.play();
    this.setState({
      open: true
    });
  };

  render() {
    const modalClasses = classNames({
      modal: true,
      open: this.state.open
    });
    return (
      <Dialog
        className={modalClasses}
        isShown={this.state.open}
        width={"max-content"}
        topOffset="30px"
        title="Image conversion results"
        onCloseComplete={() => this.setState({ open: false })}
        hasFooter={false}
      >
        <Divide />
        <div className="output-options">
          <label htmlFor="color">Text Color:</label>
          <input
            type="color"
            id="color"
            name="color"
            value={this.state.color}
            onChange={this.setColor}
          />
          <label htmlFor="color">Background Color:</label>
          <input
            type="color"
            id="bgColor"
            name="bgColor"
            value={this.state.bgColor}
            onChange={this.setBgColor}
          />
          <Button className="save-btn" onClick={this.savePic}>
            Save as Image
          </Button>
        </div>
        <Divide />
        <div className="output-text-wrapper">
          <div
            id="output-text-block"
            className="output-text-block"
            style={{
              color: this.state.color,
              backgroundColor: this.state.bgColor
            }}
            ref={this.outputRef}
          >
            {this.props.frames.length
              ? this.props.frames[this.state.frameIndex].text.map(
                  (line, index) => <pre key={index}>{line}</pre>
                )
              : null}
          </div>
        </div>
      </Dialog>
    );
  }
}
