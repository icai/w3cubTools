export const downloadImage = (dom: any, filename: string) => {
  if (dom) {
    const imageTags = dom.querySelector('img')
    const link = document.createElement('a');
    link.href = imageTags.src;
    link.download = filename;
    link.click();
  }
}
