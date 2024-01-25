import { useCallback, useEffect, useState } from "react";
import { proxyUrl } from "@/utils/proxyToDataUrl";
export const useProxyDataUrl = (iurl: string) => {
  const [url, setUrl] = useState<string>(iurl || '');
  const [dataUrl, setUpdateUrl] = useState<string>('');

  const setDataUrl = useCallback((url: string) => {
    setUrl(url);
    try {
      let nurl = url;
      const x = new URL(nurl, location.origin);
      if (x.origin !== window.location.origin) {
        nurl = proxyUrl + nurl;
      } else {
        nurl = x.href;
      }
      // make sure url is image url
      if (nurl.match(/\.(jpeg|jpg|gif|png)$/)) {
        setUpdateUrl(nurl);
      } else {
        setUpdateUrl('');
      }
    } catch (error) {
      console.error("Invalid URL:", error);
    }
  }, [url]);
  useEffect(() => {
    setDataUrl(url);
  }, [url]);
  return { url, dataUrl, setUpdateUrl, setDataUrl };
}
