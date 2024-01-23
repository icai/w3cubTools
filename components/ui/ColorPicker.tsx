import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { Pane } from 'evergreen-ui';

export type ColorPickerProps = {
  value: string;
  onChange?: (color: string) => void;
  [k: string]: any;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, ...props }) => {
  const [currentColor, setCurrentColor] = useState(value || '#000000');

  const fontColor = useMemo(() => {
    // @ts-ignore
    const [r, g, b] = currentColor.replace('#', '').match(/.{1,2}/g).map((hex) => parseInt(hex, 16));
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000000' : '#ffffff';
  }, [currentColor]);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentColor(value);
    }
  }, [value]);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setCurrentColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };
  return (
    <Pane
      display="inline-block"
      boxSizing="border-box"
      height="32px"
      fontSize="14px"
      width="100%"
      position="relative"
      {...props}
    >
      <Pane
        border="1px solid #d8d8d8"
        height="100%"
        boxSizing="border-box"
        borderRadius="3px"
        transition="border-color .3s cubic-bezier(.645,.045,.355,1)"
        cursor="pointer">
        <Pane
          borderRadius="3px"
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          left="4px"
          right="4px"
          top="4px"
          bottom="4px"
        >

          <input type="color" style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', zIndex: 1 }} value={currentColor} onChange={handleColorChange} />
          <div style={{ position: 'absolute', inset: '0px', backgroundColor: currentColor }}></div>
          <div style={{ color: fontColor, zIndex: 2 }}>{currentColor}</div>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default ColorPicker;
