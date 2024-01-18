import React, { useState, useRef } from "react";
import Divide from "./component/Divide";
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
import "./style/index.scss";

const App: React.FC = () => {
  const [transformWidth, setTransformWidth] = useState<string>("");
  const [transformResult, setTransformResult] = useState<any[]>([]);
  const [transformPlaceholder, setTransformPlaceholder] = useState<string>(
    DEFAULT_AVAILABLE_TEXTS
  );
  const [rawImage, setRawImage] = useState<HTMLImageElement>();
  const [file, setFile] = useState<File>();

  const imagePreview = useRef<any>(null);
  const framesModal = useRef<any>(null);

  const setDemoImage = async () => {
    const res = await fetch("/static/demo.png");
    const value = await res.blob();
    function blobToFile(theBlob: Blob, fileName: string): File {
      // A Blob() is almost a File() - it's just missing the two properties below which we will add
      (theBlob as any).lastModifiedDate = new Date();
      (theBlob as any).name = fileName;
      return theBlob as File;
    }
    const file = blobToFile(value, "demo.png");
    imagePreview.current?.previewImage(file);
    setTransformWidth("600");
  };

  const rescale = () => {
    if (!file) {
      return;
    }
    imagePreview.current?.scaleImageContainer();
  };

  const transform = () => {
    if (!file) {
      return;
    }
    setTransformResult([]);
    // @ts-ignore
    setRawImage(null);
    setTransformWidth("");
    const image = imagePreview.current?.getCurrentImage();
    if (!image) {
      return;
    }
    const framesData = getImageDatas(image, file);
    framesData.forEach(frameData => {
      frameData.text = transformImageToText(
        frameData.data,
        createGrayToTextFunc(transformPlaceholder || DEFAULT_AVAILABLE_TEXTS)
      );
    });
    setTransformResult(framesData);
    framesModal.current?.open();
  };

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
            value={transformWidth}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setTransformWidth(ev.target.value)
            }
          />
        </TransformSetting>
        <Button height={60} onClick={rescale}>
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
            value={transformPlaceholder}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setTransformPlaceholder(ev.target.value)
            }
          />
        </TransformSetting>
        <Button height={60} whiteSpace="nowrap" onClick={transform}>
          Start Convert
        </Button>
      </Row>
      <Divide />
      <div style={{ margin: "auto", marginTop: "15px", textAlign: "center" }}>
        <Button height={40} whiteSpace="nowrap" onClick={setDemoImage}>
          Demo Image
          <span style={{ display: "none" }}>
            Welcome to GZ https://www.youtube.com/watch?v=DpRpahhJoJE
          </span>
        </Button>
      </div>
      <Row>
        <ImagePreviewUpload
          file={file}
          // @ts-ignore
          image={rawImage}
          setImageAndFile={(image, file) => {
            setRawImage(image);
            setFile(file);
            // // diff with image.width max width 600
            // setTransformWidth(
            //   image.width > 600 ? "600" : image.width.toString()
            // );
          }}
          previewWidth={parseInt(transformWidth)}
          ref={imagePreview}
        />
      </Row>
      <FramesModal
        ref={framesModal}
        frames={transformResult}
        // @ts-ignore
        file={file}
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
};

export default App;
