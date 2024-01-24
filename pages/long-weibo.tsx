import React, { useState, useRef, useEffect } from "react";
import { Button, Pane, Dialog } from "evergreen-ui";
import { proxyToDataUrl } from '@/utils/proxyToDataUrl'

class MyUploadAdapter {
  loader: any;
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    const loader = this.loader;
    return loader.file;
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}


const doImages = () => {
  // @ts-ignore
  const ckContent: HTMLElement = document.querySelector( ".ck.ck-content")
  const images = ckContent.getElementsByTagName("img");

  [].slice.call(images).forEach((item, _i) => {
    item.removeAttribute("srcset");
    if (/^(https?\:)?\/\//.test(item.src)) {
      proxyToDataUrl(item.src, (url) => {
        item.src = url;
      });
    }
  });
};

const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default function LongWeibo() {
  const editorRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");

  // @ts-ignore: Unreachable code error
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const generateImage = () => {
    // @ts-ignore
    var images = document
      .querySelector(".ck.ck-content")
      .getElementsByTagName("img");

    if (images) {
      const imgs: any[] = [].slice.call(images).reduce((prev, item) => {
        if (/^(https?\:)?\/\//.test(item.src)) {
          return prev + Number(true);
        } else {
          return prev;
        }
      }, 0);

      if (imgs.length > 0) {
        setLoading(true);
        setTimeout(() => {
          generateImage();
        }, 300);
        return;
      } else {
        setLoading(false);
      }
    }

    let el = document.querySelector(".ck.ck-content");
    if (el) {
      var data = el.className;
      el.className += " html2canvasreset";
      if (!checked) {
        let masker = document.createElement("div");
        masker.style.font = "10px Comic Sans MS";
        masker.style.color = "#efefef";
        masker.style.textAlign = "right";
        masker.style.marginTop = "20px";
        masker.innerHTML = "Imaged by w3cubTools";
        el.appendChild(masker);
      }
      html2canvas(el, {
        allowTaint: true,
        allowedContent: true,
        width: el.scrollWidth,
        height: el.scrollHeight + 100,
      }).then((canvas: HTMLCanvasElement) => {
        // @ts-ignore
        el.className = data;
        // canvas to base64
        const base64data = canvas.toDataURL("image/png");
        setPreviewImg(base64data as string);
        setOpen(true);
      });
    }
  };

  const downloadImage = (_event) => {
    // download previewImg
    var blob = dataURLtoBlob(previewImg);
    saveAs(blob, "longweibo.png");
  };

  return (
    <>
      <div className="box" style={{ width: "700px", margin: "auto" }}>
        <h1>长微博生成器</h1>
        <Pane marginBottom={15} display="flex">
          <Button height={50} isLoading={isLoading} onClick={generateImage}>
            Generate Image
          </Button>
        </Pane>
        <Dialog
          isShown={open}
          width={"max-content"}
          topOffset="30px"
          title="Image results"
          onCloseComplete={() => setOpen(false)}
          hasFooter={false}
        >
          <div>
            <Button className="save-btn" onClick={downloadImage}>
              Save as Image
            </Button>
            <div id="cnavas">
              <img src={previewImg} alt="" />
            </div>
          </div>
        </Dialog>
        <div style={{ minHeight: "600px" }}>
          {editorLoaded && CKEditor && (
            <CKEditor
              editor={ClassicEditor}
              id="editor_box"
              data="<div id='capture'>Welcome to Long Weibo Generator!</div>"
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "imageUpload",
                  "blockQuote",
                  "insertTable",
                  "undo",
                  "redo"
                ], // "mediaEmbed",
                extraPlugins: [MyCustomUploadAdapterPlugin],
                config: {
                  ui: {
                    width: "500px",
                    height: "300px",
                  },
                },
              }}
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTimeout(() => {
                  doImages();
                }, 300);
                console.log({ event, editor, data });
              }}
              onBlur={(editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(editor) => {
                console.log("Focus.", editor);
              }}
            />
          )}
        </div>
        <style jsx>{`
          .html2canvasreset {
            overflow: visible !important;
            width: auto !important;
            height: auto !important;
            max-height: auto !important;
            border: 1px solid transparent !important;
          }
          .ck-editor__main > .ck-editor__editable {
            min-height: 500px;
          }
        `}</style>
      </div>
    </>
  );
}
