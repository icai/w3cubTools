import { useState, useEffect, useRef } from 'react';
import {
  Card,
  Checkbox,
  Button,
  SelectField,
  TextInputField
} from 'evergreen-ui';
import ColorPicker from '@/components/ui/ColorPicker';
import { useQRCode } from 'next-qrcode';
import { downloadImage } from '@/utils/downloadImage';

export const wifiEncryptions = ['WEP', 'WPA', 'nopass', 'WPA2-EAP'] as const;
export type WifiEncryption = typeof wifiEncryptions[number];

export const EAPMethods = [
  'MD5',
  'POTP',
  'GTC',
  'TLS',
  'IKEv2',
  'SIM',
  'AKA',
  'AKA\'',
  'TTLS',
  'PWD',
  'LEAP',
  'PSK',
  'FAST',
  'TEAP',
  'EKE',
  'NOOB',
  'PEAP',
] as const;
export type EAPMethod = typeof EAPMethods[number];

export const EAPPhase2Methods = [
  'None',
  'MSCHAPV2',
] as const;
export type EAPPhase2Method = typeof EAPPhase2Methods[number];

interface IWifiQRCodeOptions {
  ssid: string;
  password: string;
  eapMethod: EAPMethod;
  isHiddenSSID: boolean;
  eapAnonymous: boolean;
  eapIdentity: string;
  eapPhase2Method: EAPPhase2Method;
}

interface GetQrCodeTextOptions {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  eapMethod: EAPMethod;
  isHiddenSSID: boolean;
  eapAnonymous: boolean;
  eapIdentity: string;
  eapPhase2Method: EAPPhase2Method;
}

function escapeString(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

function getQrCodeText(options: GetQrCodeTextOptions): string | null {
  const { ssid, password, encryption, eapMethod, isHiddenSSID, eapAnonymous, eapIdentity, eapPhase2Method } = options;
  if (!ssid) {
    return null;
  }
  if (encryption === 'nopass') {
    return `WIFI:S:${escapeString(ssid)};;`;
  }
  if (encryption !== 'WPA2-EAP' && password) {
    return `WIFI:S:${escapeString(ssid)};T:${encryption};P:${escapeString(password)};${isHiddenSSID ? 'H:true' : ''};`;
  }
  if (encryption === 'WPA2-EAP' && password && eapMethod) {
    if (!eapIdentity && !eapAnonymous) {
      return null;
    }
    if (eapMethod === 'PEAP' && !eapPhase2Method) {
      return null;
    }
    const identity = eapAnonymous ? 'A:anon' : `I:${escapeString(eapIdentity)}`;
    const phase2 = eapPhase2Method !== 'None' ? `PH2:${eapPhase2Method};` : '';
    return `WIFI:S:${escapeString(ssid)};T:WPA2-EAP;P:${escapeString(password)};E:${eapMethod};${phase2}${identity};${isHiddenSSID ? 'H:true' : ''};`;
  }
  return null;
}

export function useWifiQRCodeText({
  ssid,
  password,
  eapMethod,
  isHiddenSSID,
  eapAnonymous,
  eapIdentity,
  eapPhase2Method,
}: IWifiQRCodeOptions) {
  const [qrcode, setQrcode] = useState<string>('');
  const [encryption, setEncryption] = useState<WifiEncryption>('WPA');

  useEffect(() => {
    const generateQRCode = async () => {
      const text = getQrCodeText({
        ssid,
        password,
        encryption,
        eapMethod,
        isHiddenSSID,
        eapAnonymous,
        eapIdentity,
        eapPhase2Method,
      });
      if (text) {
        setQrcode(text.trim());
      }
    };

    generateQRCode();
  }, [ssid, password, encryption, eapMethod, isHiddenSSID, eapAnonymous, eapIdentity, eapPhase2Method]);

  return { qrcode, encryption, setEncryption };
}


const WifiSettings: React.FC = () => {
  const [foreground, setForeground] = useState<string>('#000000ff');
  const [background, setBackground] = useState<string>('#ffffffff');

  const [ssid, setSsid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [eapMethod, setEapMethod] = useState<string>('');
  const [isHiddenSSID, setIsHiddenSSID] = useState<boolean>(false);
  const [eapAnonymous, setEapAnonymous] = useState<boolean>(false);
  const [eapIdentity, setEapIdentity] = useState<string>('');
  const [eapPhase2Method, setEapPhase2Method] = useState<string>('');
  const qrcodeRef = useRef<HTMLImageElement>(null);
  const { qrcode, encryption, setEncryption } = useWifiQRCodeText({
    ssid,
    password,
    // @ts-ignore
    eapMethod,
    isHiddenSSID,
    eapAnonymous,
    eapIdentity,
    // @ts-ignore
    eapPhase2Method,
  });
  const { Image } = useQRCode();
  return (
    <Card width="600px" margin="auto">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        <div>
          <SelectField
            value={encryption}
            marginBottom={4}
            label="Encryption method"
            defaultValue="WPA"
            // @ts-ignore
            onChange={(e) => setEncryption(e.target.value)}
          >
            {
              [
                { label: 'No password', value: 'nopass' },
                { label: 'WPA/WPA2', value: 'WPA' },
                { label: 'WEP', value: 'WEP' },
                { label: 'WPA2-EAP', value: 'WPA2-EAP' },
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            }
          </SelectField>
          <div style={{ marginBottom: '6px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px' }}>
            <TextInputField
              value={ssid}
              label="SSID:"
              placeholder="Your WiFi SSID..."
              marginBottom={6}
              onChange={(e) => setSsid(e.target.value)}
            />
             <Checkbox marginTop="37px"  checked={isHiddenSSID}   onChange={() => setIsHiddenSSID(!isHiddenSSID)} label="Hidden SSID" />
          </div>
          {encryption !== 'nopass' && (
            <TextInputField
              value={password}
              label="Password:"
              type="password"
              placeholder="Your WiFi Password..."
              marginBottom={6}
              onChange={(e) => setPassword(e.target.value)}
            />)}
          {encryption === 'WPA2-EAP' &&
            <SelectField
              value={eapMethod}
              label="EAP method"
              marginBottom={4}
              onChange={(e) => setEapMethod(e.target.value)}
            >
              {EAPMethods.map((method) => ({ label: method, value: method })).map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              }


            </SelectField>}
          <div style={{ marginBottom: '6px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px' }}>
            {encryption === 'WPA2-EAP' &&
              <TextInputField
                value={eapIdentity}
                label="Identity:"
                placeholder="Your EAP Identity..."
                marginBottom={6}
                onChange={(e) => setEapIdentity(e.target.value)}
              />}
            {encryption === 'WPA2-EAP' &&
              <Checkbox marginTop="37px"  checked={eapAnonymous} 
              onChange={() => setEapAnonymous(!eapAnonymous)} label="Anonymous?" />}
          </div>
          {encryption === 'WPA2-EAP' &&
            <SelectField
              value={eapPhase2Method}
              label="EAP Phase 2 method"
              marginBottom={4}
              onChange={(e) => setEapPhase2Method(e.target.value)}
            >
              {EAPPhase2Methods.map((method) => ({ label: method, value: method })).map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
            </SelectField>}
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
          </div>
        </div>
        <div>
          {qrcode && (
            <div ref={qrcodeRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <Image
                text={qrcode}
                options={{
                  type: 'image/jpeg',
                  quality: 0.3,
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 300,
                  color: {
                    dark: foreground,
                    light: background,
                  },
                }}
              />

              <Button onClick={() => {
                downloadImage(qrcodeRef.current, 'wifi-qrcode.jpeg');
              }}>
                Download qr-code
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WifiSettings;
