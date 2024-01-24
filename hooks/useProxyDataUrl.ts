import { useCallback, useEffect, useState } from "react";

import { proxyUrl } from "@/utils/proxyToDataUrl";
export const useProxyDataUrl = (url: string) => {
  const [dataUrl, setUpdateUrl] = useState<string>('');

  const setDataUrl = useCallback((url: string) => {
    try {
      let nurl = url;
      const x = new URL(nurl, location.origin);
      if (x.origin !== window.location.origin) {
        nurl = proxyUrl + nurl;
      } else {
        nurl = x.href;
      }
      setUpdateUrl(nurl);
    } catch (error) {
      console.error("Invalid URL:", error);
    }
  }, [url]);
  useEffect(() => {
    setDataUrl(url);
  }, [url]);
  return { url, dataUrl, setDataUrl };
}
