import React, { useState, useEffect, useMemo, useLayoutEffect, useCallback } from 'react';
import {
  Textarea,
  Pane,
  TextInputField,
  TextareaField,
  Switch,
  Button,
  Paragraph,
  Label,
  Heading,
  majorScale,
  minorScale,
  TextInput,
} from 'evergreen-ui';

import { useCopy } from '@/hooks/useCopy';
import { useDownloadFileFromBase64 } from '@/hooks/useDownload';
import { textToBase64 } from '@/utils/base64';
import FormField from '@/components/ui/FormField';
import { Row, Col } from '@/components/ui/grid';

const SvgGenerator: React.FC = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(350);
  const [fontSize, setFontSize] = useState(26);
  const [bgColor, setBgColor] = useState('#cccccc');
  const [fgColor, setFgColor] = useState('#333333');
  const [useExactSize, setUseExactSize] = useState(true);
  const [customText, setCustomText] = useState('');

  const svgString = useMemo(() => {
    const w = width || 'null';
    const h = height || 'null';
    const text = customText.length > 0 ? customText : `${w}x${h}`;
    const size = useExactSize ? ` width="${w}" height="${h}"` : '';

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${size}>
  <rect width="${w}" height="${h}" fill="${bgColor}"></rect>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize}px" fill="${fgColor}">${text}</text>   
</svg>
    `.trim();
  }, [width, height, customText, useExactSize, fontSize, bgColor, fgColor]);


  const base64 = useMemo(() => {
    return `data:image/svg+xml;base64,${textToBase64(svgString)}`
  }, [svgString]);


  const { copy: copySVG } = useCopy({ source: svgString });
  const { copy: copyBase64 } = useCopy({ source: base64 });
  const { download } = useDownloadFileFromBase64({ source: base64 });

  return (
    <Pane
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
      flexWrap="wrap"
      gap="16px"
    >
      <Pane
        flex="0 1 600px"
      >
        <Heading size={700} marginBottom={majorScale(2)}>
          SVG Generator
        </Heading>
        <Pane marginBottom={majorScale(4)}>
          <Row gutter={10} >
            <Col span={12}>
              <FormField labelWidth={100} label="Width (in px)">
                <TextInput
                  width={150}
                  value={width.toString()}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  placeholder="SVG width..."
                  type="number"
                  min="1"
                />
              </FormField>
            </Col>
            <Col span={12}>
              <FormField labelWidth={100} label="Background">
                <TextInput
                  width={150}
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  placeholder="Background color..."
                  type="color"
                />
              </FormField>
            </Col>
          </Row>
        </Pane>
        <Pane marginBottom={majorScale(4)}>
          <Row gutter={10} >
            <Col span={12}>
              <FormField labelWidth={100} label="Height (in px)">
                <TextInput
                  width={150}
                  value={height.toString()}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder="SVG height..."
                  type="number"
                  min="1"
                />
              </FormField>
            </Col>
            <Col span={12}>
              <FormField labelWidth={100} label="Text color">
                <TextInput
                  width={150}
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  placeholder="Text color..."
                  type="color"
                />
              </FormField>
            </Col>
          </Row>
        </Pane>
        <Pane marginBottom={majorScale(4)}>
          <Row gutter={10} >
            <Col span={12}>
              <FormField labelWidth={100} label="Font size">
                <TextInput
                  width={150}
                  value={fontSize.toString()}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  placeholder="Font size..."
                  type="number"
                  min="1"
                />
              </FormField>
            </Col>
            <Col span={12}>
              <FormField labelWidth={100} label="Custom text">
                <TextInput
                  width={150}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={`Default is ${width}x${height}`}
                />
              </FormField>
            </Col>
          </Row>
        </Pane>
        <Pane marginBottom={majorScale(4)}>
          <Label htmlFor="useExactSize" marginBottom={minorScale(2)}>
            Use exact size
          </Label>
          <Switch id="useExactSize" checked={useExactSize} onChange={() => setUseExactSize(!useExactSize)} />
        </Pane>

        <Pane marginBottom={majorScale(4)}>
          <Label marginBottom={minorScale(2)}>SVG HTML element</Label>
          <Textarea value={svgString} height={120} readOnly />
        </Pane>
        <Pane marginBottom={majorScale(4)}>
          <Label marginBottom={minorScale(2)}>SVG in Base64</Label>
          <Textarea value={base64} height={120} readOnly />
        </Pane>

        <Pane display="flex" justifyContent="space-between">
          <Button onClick={() => copySVG()}>Copy SVG</Button>
          <Button onClick={() => copyBase64()}>Copy Base64</Button>
          <Button onClick={() => download()}>Download SVG</Button>
        </Pane>
      </Pane>
      <img src={base64} alt="Image" style={{ marginTop: majorScale(4), maxWidth: '100%', flex: '0 1 600px' }} />
    </Pane>
  );
};

export default SvgGenerator;
