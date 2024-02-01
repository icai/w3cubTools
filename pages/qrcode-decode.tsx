

import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { FilePicker, TextInput, Button, Pane, Text, Pre, Spinner } from 'evergreen-ui';
import {
  readBarcodesFromImageFile
  // @ts-ignore
} from "zxing-wasm/reader";
import { proxyToDataUrlPromise } from '@/utils/proxyToDataUrl'
import { dataURLtoBlob } from '@/utils/dataURLtoBlob'
import IconCopyable from '@/components/ui/IconCopyable';
import Divider from '@/components/ui/Divider';
import { useProxyDataUrl } from '@/hooks/useProxyDataUrl';
const QRCodeDecoder = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const { url, dataUrl, setDataUrl } = useProxyDataUrl("/static/bmc_qr.png");
  const [qrCodeResult, setQrCodeResult] = useState('');
  const [previewImg, setPreviewImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilePick = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUrlInputChange = (e) => {
    setDataUrl(e.target.value);
  };

  const handleQrCodeScan = useCallback(
    (data) => {
      if (data) {
        setQrCodeResult(data);
      }
    },
    [setQrCodeResult]
  );

  const handleDecodeFile = async () => {
    try {
      // @ts-ignore
      setPreviewImg(URL.createObjectURL(file))
      setLoading(true)
      const result = await readBarcodesFromImageFile(file);
      setQrCodeResult(result ? result[0]?.text : 'No QR code found');
      setLoading(false)
    } catch (error) {
      console.error('Error decoding file:', error);
    }
  };

  const handleDecodeUrl = async () => {
    try {
      setLoading(true)
      // fetch image data from url
      const response: string = await proxyToDataUrlPromise(dataUrl);
      const blob = dataURLtoBlob(response);
      setPreviewImg(response)
      const result = await readBarcodesFromImageFile(blob);
      setQrCodeResult(result ? result[0]?.text : 'No QR code found');
      setLoading(false)
    } catch (error) {
      console.error('Error decoding URL:', error);
    }
  };
  useEffect(() => {
    if (file) {
      handleDecodeFile()
    }
  }, [file]);

  useLayoutEffect(() => {
    if (dataUrl) {
      handleDecodeUrl()
    }
  }, [dataUrl]);


  return (
    <Pane maxWidth={600} marginX="auto" marginTop={40} textAlign="center">
      {/* <QrReader
        onScan={handleQrCodeScan}
        onError={(error) => console.error('QR Code Scanner Error:', error)}
        style={{ width: '100%' }}
      /> */}

      <FilePicker
        accept=".png, .jpg, .jpeg"
        multiple={false}
        width="100%"
        onChange={(files) => handleFilePick(files)}
        marginBottom={16}
      >
        {file ? file.name : 'Choose a QR code image file'}
      </FilePicker>

      <TextInput
        placeholder="Enter URL of QR code image"
        value={url}
        width="100%"
        onChange={handleUrlInputChange}
        marginBottom={16}
      />
      <Pane marginTop={16}>
        <Button onClick={handleDecodeFile} marginRight={8}>
          Decode File
        </Button>
        <Button onClick={handleDecodeUrl} marginRight={8}>
          Decode URL
        </Button>
      </Pane>
      <Pane margin="auto" marginTop={16} >
        <Pane>
          {previewImg ? 
            <img src={previewImg} width={500} height={500} /> :
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={500}
            >
              <Spinner />
            </Pane>

          }
        </Pane>
        <Pane>
          <Divider />
          <Text size={500}>QR Code Result:</Text>

          {loading ? (
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Spinner />
            </Pane>
          ) : (
            <Pane position="relative"
            >
              <pre style={
                {
                  textAlign: 'left',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  wordWrap: 'break-word',
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '3px',
                  padding: '10px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  fontFamily: 'Consolas, Monaco, monospace',
                  margin: '10px 0',
                  overflow: 'auto',
                }
              }>{qrCodeResult}</pre>
              <IconCopyable
                position="absolute"
                top={0}
                right={0}
                value={qrCodeResult} />
            </Pane>)}



        </Pane>
      </Pane>
    </Pane>
  );
};

export default QRCodeDecoder;

