import React, { forwardRef, useRef, useState, ChangeEvent, DragEvent, useImperativeHandle } from "react";
import classNames from "classnames";
import { checkImageType } from "../tools/imageCommon";
import { toaster } from "evergreen-ui";
import "../style/imagePreviewUpload.css";

interface ImagePreviewUploadProps {
  className?: string;
  previewWidth?: number;
  setImageAndFile: (image: HTMLImageElement, file: File) => void;
  image: HTMLImageElement;
}

const ImagePreviewUpload = ((props, ref) => {
  const {
    className,
    previewWidth,
    setImageAndFile,
    image: propImage
  } = props;

  const fileUpload = useRef<HTMLInputElement>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    isDragging: false,
    width: 400,
    height: 250
  });

  const dragEnter = (ev: DragEvent) => {
    ev.preventDefault();
    setState({
      ...state,
      isDragging: true
    });
  };

  const dragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const dragLeave = (ev: DragEvent) => {
    ev.preventDefault();
    setState({
      ...state,
      isDragging: false
    });
  };

  const drop = (ev: DragEvent) => {
    ev.preventDefault();
    setState({
      ...state,
      isDragging: false
    });
    const file = (ev.dataTransfer?.files || [])[0];
    if (file) {
      previewImage(file);
    }
  };

  const openFileInput = () => {
    fileUpload.current?.click();
  };

  const setFile = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = (ev.target?.files || [])[0];
    if (file) {
      previewImage(file);
    }
  };

  const previewImage = (file: File) => {
    if (!checkImageType(file.type)) {
      toaster.notify("Files in this format are not supported");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      const image = new Image();
      image.addEventListener("load", () => {
        scaleImageContainer(image);
        setImageAndFile(image, file);
      });
      image.src = reader.result as string;
    });
  };

  const scaleImageContainer = (image: HTMLImageElement) => {
    if (!image) {
      image = propImage!;
    }
    // @ts-ignore
    const container = componentRef.current!.parentElement!;
    let targetWidth = previewWidth || 0;

    if (!targetWidth) {
      targetWidth = container.clientWidth;
      if (image.width < targetWidth) {
        targetWidth = image.width;
      }
    } else if (targetWidth > container.clientWidth) {
      toaster.notify(
        "More than the container size! Please re-enter the image width"
      );
      return;
    }

    const ratio = image.width / targetWidth;
    const targetHeight = image.height / ratio;
    setState({
      ...state,
      width: targetWidth,
      height: targetHeight
    });
  };

  const uploadBlockClasses = classNames(
    "upload-image-block",
    { active: state.isDragging },
    className
  );

  const getCurrentImage = () => {
    return currentImageRef.current;
  }

  // expose methods
  useImperativeHandle(ref, () => ({
    previewImage,
    scaleImageContainer,
    getCurrentImage
  }));

  return (
    <div
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={drop}
      onClick={openFileInput}
      className={uploadBlockClasses}
      style={{ width: state.width, height: state.height }}
      ref={componentRef}
    >
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        ref={fileUpload}
        onChange={setFile}
      />
      <span className="upload-label">Upload Image</span>
      {propImage ? (
        <img
          ref={currentImageRef}
          src={propImage.src}
          className="preview-image"
          alt="Preview"
        />
      ) : null}
    </div>
  );
});

export default forwardRef<HTMLDivElement, ImagePreviewUploadProps>(ImagePreviewUpload);
