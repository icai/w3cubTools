import { useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import { Card, Textarea, SelectField, Button, Pane } from 'evergreen-ui';
import ColorPicker from '@/components/ui/ColorPicker';
import { downloadImage } from '@/utils/downloadImage';
const QRCodeGenerator: React.FC = () => {
  const [foreground, setForeground] = useState<string>('#000000');
  const [background, setBackground] = useState<string>('#ffffff');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<any>('medium');
  const [text, setText] = useState<string>('https://tools.w3cub.com');
  const errorCorrectionLevels = ['low', 'medium', 'quartile', 'high'];
  const qrcodeRef = useRef<HTMLImageElement>(null);

  const { Image } = useQRCode();
  return (
    <Card width="600px" margin="auto">
      <div className="grid">
        <div className="input-section">
          <Textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            placeholder="Your link or text..."
            marginBottom={6}
          />
          <div className="form">
            <div className="form-item">
              <label>Foreground color:</label>
              <ColorPicker
                value={foreground}
                onChange={(value: string) => setForeground(value)}
              />
            </div>
            <div className="form-item">
              <label>Background color:</label>
              <ColorPicker
                value={background}
                onChange={(value: string) => setBackground(value)}
              />
            </div>
            <SelectField
              value={errorCorrectionLevel}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setErrorCorrectionLevel(e.target.value)}
              label="Error resistance:"
              width="100%"
              marginBottom={6}
            >
              {errorCorrectionLevels.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </SelectField>
          </div>
        </div>
        <Pane className="image-section">
          <Pane display="flex" 
          flexDirection="column"
            alignItems="center"
            gap={6} ref={qrcodeRef}>
          <Image
            text={text}
            options={{
                type: 'image/jpeg',
                quality: 0.3,
                errorCorrectionLevel: errorCorrectionLevel,
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                    dark: foreground,
                    light: background,
                },
            }}
            />
            <Button onClick={() => {
                downloadImage(qrcodeRef.current, 'qrcode.jpeg');
            }}>
              Download qr-code
            </Button>
          </Pane>
        </Pane>
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .input-section {
          grid-column: span 2;
        }

        .form-item {
          margin-bottom: 6px;
        }
        .image-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </Card>
  );
};

export default QRCodeGenerator;
