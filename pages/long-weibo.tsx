import React, { useState } from "react";
import { Button, Pane, Dialog, Switch } from "evergreen-ui";

let ClassicEditor, CKEditor;

if (__CLIENT__) {
  ClassicEditor = _ckeditor_ckeditor5BuildClassic;
  CKEditor = _ckeditor_ckeditor5React;
}
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
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    callback(xhr.response);
  };
  xhr.open("GET", url);
  xhr.send();
}

const proxyToDataUrl = (url, callback) => {
  url = "https://helloacm.com/api/image-to-base64/?url=" + url;
  return toDataUrl(url, callback);
};

const doImages = () => {
  var images = document
    .querySelector(".ck.ck-content")
    .getElementsByTagName("img");
  [].slice.call(images).forEach((item, _i) => {
    item.removeAttribute("srcset");
    if (/^(https?\:)?\/\//.test(item.src)) {
      proxyToDataUrl(item.src, url => {
        item.src = url;
      });
    }
  });
};

export default function() {
  const generateImage = () => {
    var images = document
      .querySelector(".ck.ck-content")
      .getElementsByTagName("img");
    var imgs = [].slice.call(images).reduce((prev, item) => {
      if (/^(https?\:)?\/\//.test(item.src)) {
        return prev + Number(true);
      } else {
        return prev;
      }
    }, 0);
    if (imgs > 0) {
      setLoading(true);
      setTimeout(() => {
        generateImage();
      }, 300);
      return;
    } else {
      setLoading(false);
    }
    let el = document.querySelector(".ck.ck-content");
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
      height: el.scrollHeight + 100
    }).then(canvas => {
      el.className = data; //old className - Jquery: $(target).removeClass("html2canvasreset");
      setOpen(true);
      canvas.id = "imgcanvas";
      let div = document.getElementById("cnavas");
      if (div) {
        div.append(canvas);
      }
    });
  };
  const downloadImage = _event => {
    let canvas = document.getElementById("imgcanvas") as HTMLCanvasElement;
    canvas.toBlob(function(blob) {
      saveAs(blob, "longweibo.png");
    });
  };
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div className="box" style={{ width: "700px", margin: "auto" }}>
      <h1>长微博生成器</h1>
      <Pane marginBottom={15} display="flex">
        <Button height={50} isLoading={isLoading} onClick={generateImage}>
          Generate Image
        </Button>
        {/* <Pane display="flex" marginLeft={20} >
                   <span style={{lineHeight: '40px', marginRight: '10px'}}>Remove watermark</span>
                   <Switch
                    height={40}
                    checked={checked}
                    onChange={e => setChecked(e.target.checked)}
                    />
                </Pane> */}
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
          <div id="cnavas"></div>
        </div>
      </Dialog>
      <div style={{ minHeight: "600px" }}>
        {__CLIENT__ && (
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
                  height: "300px"
                }
              }
            }}
            onInit={editor => {
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
            onBlur={editor => {
              console.log("Blur.", editor);
            }}
            onFocus={editor => {
              console.log("Focus.", editor);
            }}
          />
        )}
      </div>

      <style>{`
                .html2canvasreset{
                    overflow: visible !important;
                    width: auto !important;
                    height: auto !important;
                    max-height: auto !important;
                    border: 1px solid transparent!important;
                }
                .ck-editor__main > .ck-editor__editable {
                    min-height: 500px;
                }
                `}</style>
    </div>
  );
}
