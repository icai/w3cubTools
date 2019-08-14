import React from "react";
import Divide from "./component/Divide";
// import Button from './component/Button'
import { Button, TextInput, Alert } from "evergreen-ui";
import FramesModal from "./component/FramesModal";
import TransformSetting from "./component/TransformSetting";
import Row from "./component/Row";
import ImagePreviewUpload from "./component/ImagePreviewUpload";
import {
  transformImageToText,
  createGrayToTextFunc
} from "./tools/imageToText";
import { getImageDatas } from "./tools/imageParser";
import { DEFAULT_AVAILABLE_TEXTS } from "./tools/constant";
import "./style/index.less";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      transformWidth: "",
      transformResult: [],
      transformPlaceholder: DEFAULT_AVAILABLE_TEXTS,
      rawImage: null,
      file: null
    };
    this.imagePreview = React.createRef();
    this.framesModal = React.createRef();
  }

  setImageAndFile = (rawImage, file) => {
    this.setState({ rawImage, file });
  };

  setTransformType = ev => {
    this.setState({
      transformType: ev.target.value
    });
  };

  setTransformPlaceholder = ev => {
    this.setState({
      transformPlaceholder: ev.target.value
    });
  };

  setTransformWidth = ev => {
    const value = ev.target.value;
    // 退格到无数字时，设置为0
    const nextNumber = value.length ? parseInt(value, 10) : 0;
    // 值为非数字时，直接返回
    if (isNaN(nextNumber)) {
      return;
    }
    this.setState({
      // 设置为字符串，防止出现0开头数字的不正确显示
      transformWidth: nextNumber.toString()
    });
  };

  rescale = () => {
    if (!this.state.file) {
      return;
    }
    this.imagePreview.current.scaleImageContainer();
  };

  /**
   * 图片转字符
   *
   * @memberof App
   */
  transform = () => {
    const file = this.state.file;
    if (!file) {
      return;
    }
    this.setState({
      isParsing: true
    });
    /**
     * @type {HTMLImageElement}
     */
    const image = this.imagePreview.current.getCurrentImage();
    const framesData = getImageDatas(image, file);
    framesData.forEach(frameData => {
      frameData.text = transformImageToText(
        frameData.data,
        createGrayToTextFunc(
          this.state.transformPlaceholder || DEFAULT_AVAILABLE_TEXTS
        )
      );
    });
    this.setState(
      {
        transformResult: framesData
      },
      () => {
        this.framesModal.current.open();
      }
    );
  };

  render() {
    return (
      <div className="imt-container">
        <header className="clear">
          <h1 className="text-center">Image to Ascii Art(图片转字符画)</h1>
        </header>
        <Divide />
        <Row className="transform-settings-wrapper">
          <TransformSetting
            label="Target image width:"
            labelFor="transform-size"
          >
            <TextInput
              type="number"
              id="transform-size"
              className="transform-size-input"
              name="transform-size"
              value={this.state.transformWidth}
              onChange={this.setTransformWidth}
            />
          </TransformSetting>
          <Button height={60} onClick={this.rescale}>
            Rescale
          </Button>
          <TransformSetting
            label="Conversion character:"
            labelFor="transform-placeholder"
          >
            <TextInput
              type="text"
              id="transform-placeholder"
              className="transform-placeholder-input"
              name="transform-placeholder"
              value={this.state.transformPlaceholder}
              onChange={this.setTransformPlaceholder}
            />
          </TransformSetting>
          <Button height={60} whiteSpace="nowrap" onClick={this.transform}>
            Start Convert
          </Button>
        </Row>
        <Divide />
        <Row>
          <ImagePreviewUpload
            file={this.state.file}
            image={this.state.rawImage}
            setImageAndFile={this.setImageAndFile}
            previewWidth={parseInt(this.state.transformWidth)}
            ref={this.imagePreview}
          ></ImagePreviewUpload>
        </Row>
        <FramesModal
          ref={this.framesModal}
          frames={this.state.transformResult}
          file={this.state.file}
        />
        <Alert
          intent="none"
          className="helps"
          title="When converting a GIF or a larger image, a certain amount of stagnation may occur, which is normal. Please wait patiently."
          marginBottom={32}
        />
        {/* <p className="helps"></p> */}
      </div>
    );
  }
}
