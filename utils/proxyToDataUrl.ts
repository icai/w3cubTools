import axios from 'axios';

export const proxyUrl = "https://s1-hono.w3cub.com/api/image-to-base64?url=";

export const toDataUrl = (url: string, callback: (data: string) => void) => {
  axios.get(url)
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

export const proxyToDataUrlPromise = async (url: string): Promise<string> => {
  try {
    return new Promise(async (resolve, reject) => {
      if (url.includes(proxyUrl)) {
        const response = await axios.get(url);
        resolve(response.data)
      } else {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
          } else {
            reject('ctx is null');
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const proxyToDataUrl = (url: string, callback: (data: string) => void) => {
  if (!url.includes(proxyUrl)) {
    url = proxyUrl + url;
  }
  toDataUrl(url, (data) => {
    callback(data);
  });
};
