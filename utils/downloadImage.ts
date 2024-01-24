export const downloadImage = (dom: any, filename: string) => {
  if (dom) {
    const imageTag = dom.querySelector('img')
    if (imageTag) {
      const link = document.createElement('a');
      link.href = imageTag.src;
      link.download = filename;
      link.click();
      return
    }
    const canvasTag = dom.querySelector('canvas');
    // download canvas image
    if (canvasTag) {
      const link = document.createElement('a');
      link.href = canvasTag.toDataURL();
      link.download = filename;
      link.click();
      return
    }
  }
}
