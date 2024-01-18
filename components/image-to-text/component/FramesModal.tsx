import React, { useState, useRef, useEffect, forwardRef, ForwardedRef, useImperativeHandle } from "react";
import classNames from "classnames";
import Divide from "./Divide";
import { Button, Dialog } from "evergreen-ui";
import { createImage } from "../tools/imageCreater";
import "../style/modal.css";

interface FramesModalProps {
  frames: Array<{
    data: ImageData;
    text: string[];
    delay: number;
  }>;
  file: File;
}

/**
 * 显示图片转字符结果的模态框
 *
 * @export
 * @function FramesModal
 * @returns {JSX.Element}
 */
const FramesModal = ({ frames, file }, ref) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [frameIndex, setFrameIndex] = useState(0);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup function to clear the timer on component unmount
      stop();
    };
  }, []);

  useEffect(() => {
    // Reset frame index when the file changes
    setFrameIndex(0);
  }, [file]);

  const savePic = () => {
    const createOption = {
      div: outputRef.current,
      frames: frames,
      file: file,
      color: color,
      bgColor: bgColor,
    } as any;
    createImage(createOption);
  };

  const play = () => {
    if (frames.length <= 1) {
      return;
    }

    const nextFrame = () => {
      const delay = frames[frameIndex].delay;
      playTimerRef.current = setTimeout(() => {
        let nextIndex = frameIndex + 1;
        if (nextIndex === frames.length) {
          nextIndex = 0;
        }
        setFrameIndex(nextIndex);
        nextFrame();
      }, delay);
    };

    nextFrame();
  };

  const stop = () => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
    }
  };

  const handleClose = (ev: React.MouseEvent) => {
    ev.preventDefault();
    stop();
    setOpen(false);
  };

  const handleOpen = () => {
    play();
    setOpen(true);
  };



  const modalClasses = classNames({
    modal: true,
    open: open,
  });

  // Forward the ref to the outermost div
  // useEffect(() => {
  //   if (ref) {
  //     // @ts-ignore
  //     ref.current = outputRef.current;
  //   }
  // }, [ref]);

  useImperativeHandle(ref, () => ({
    open: handleOpen
  }));

  return (
    <Dialog
      containerProps={{
        className: modalClasses,
      }}
      isShown={open}
      width={"max-content"}
      topOffset="30px"
      title="Image conversion results"
      onCloseComplete={() => setOpen(false)}
      hasFooter={false}
    >
      <Divide />
      <div className="output-options">
        <label htmlFor="color">Text Color:</label>
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={(ev) => setColor(ev.target.value)}
        />
        <label htmlFor="bgColor">Background Color:</label>
        <input
          type="color"
          id="bgColor"
          name="bgColor"
          value={bgColor}
          onChange={(ev) => setBgColor(ev.target.value)}
        />
        <Button className="save-btn" onClick={savePic}>
          Save as Image
        </Button>
      </div>
      <Divide />
      <div className="output-text-wrapper">
        <div
          id="output-text-block"
          className="output-text-block"
          style={{
            color: color,
            backgroundColor: bgColor,
          }}
          ref={outputRef}
        >
          {frames.length
            ? frames[frameIndex].text.map((line, index) => (
                <pre key={index}>{line}</pre>
              ))
            : null}
        </div>
      </div>
    </Dialog>
  );
};
export default forwardRef<HTMLDivElement, FramesModalProps>(FramesModal);
