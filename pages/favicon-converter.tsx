import ConversionLayout from "@components/ConversionLayout";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback
} from "react";
import { Button, Pane, toaster } from "evergreen-ui";
import JSZip from "jszip";
import { useDropzone } from "react-dropzone";

import copy from "clipboard-copy";
import { Package } from "@assets/vendor/favicon/index";
import Mdloader from "@components/Mdloader";

export default function ZipOnline() {
  const controlProps = {
    display: "flex",
    flexDirection: "row" as any,
    flex: "0 0 5%",
    flexWrap: "wrap" as any,
    height: "100%",
    padding: "0px"
  };
  var canvas, ctx, presult;

  const id = "favicon-converter";

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png"
  });

  const [value] = useState(
    [
      '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
      '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
      '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
      '<link rel="icon" href="/favicon.ico">',
      '<link rel="manifest" href="/site.webmanifest">'
    ].join("\n")
  );

  const [preview, setPreview] = useState([]);

  const showPreview = canvas => {
    // Generate package
    presult = Package.generate(canvas);
    setPreview(Object.keys(presult).map(key => ({ key, img: presult[key] })));
  };

  const download = () => {
    presult = Package.generate(canvas);
    var zip = new JSZip();
    zip.file("apple-touch-icon.png", presult.png180.split(",")[1], {
      base64: true
    });
    zip.file("favicon-32x32.png", presult.png32.split(",")[1], {
      base64: true
    });
    zip.file("favicon-16x16.png", presult.png16.split(",")[1], {
      base64: true
    });
    zip.file("favicon.ico", presult.ico.split(",")[1], {
      base64: true
    });

    zip.file("android-chrome-192x192.png", presult.png192.split(",")[1], {
      base64: true
    });
    zip.file("android-chrome-512x512.png", presult.png512.split(",")[1], {
      base64: true
    });

    zip.file(
      "site.webmanifest",
      JSON.stringify({
        name: "tools.w3cub.com",
        short_name: "",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
      })
    );
    zip.file("index.html", value);
    zip.generateAsync({ type: "blob" }).then(function(content) {
      // see FileSaver.js
      saveAs(content, `favicon_w3cub.zip`);
    });
  };

  const convertZip = () => {
    if (acceptedFiles && acceptedFiles.length) {
      canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");
      const reader = new FileReader();
      // reader.onabort = () => console.log("file reading was aborted");
      // reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const image = new Image();
        image.onload = function() {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          download();
        };
        image.src = reader.result as string;
      };
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      toaster.danger("Upload your image firstly.");
    }
  };

  useLayoutEffect(() => {
    if (acceptedFiles && acceptedFiles.length) {
      canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");
      const reader = new FileReader();
      // reader.onabort = () => console.log("file reading was aborted");
      // reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const image = new Image();
        image.onload = function() {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          showPreview(canvas);
        };
        image.src = reader.result as string;
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  // copy value
  const copyValue = useCallback(() => {
    copy(value);
    toaster.success("Copied to clipboard.", {
      id
    });
  }, [value]);

  function highlight(html) {
    return html
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/([\"])([^\s]+)\1/gm, '"<span class="string">$2</span>"')
      .replace(
        /\b(rel|sizes|href|type|link)\b/gm,
        '<span class="keyword">$1</span>'
      );
  }
  // highlight code once
  const [highlightCode, setHighlightCode] = useState(value);
  useLayoutEffect(() => {
    setHighlightCode(highlight(value));
  }, [value]);

  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <Pane>
        <h1>Favicon Generator</h1>
        <p>
          Generate your favicon from an image by uploading your image below.
          Download your favicon to your website make better user experience and
          seo.
        </p>
      </Pane>
      <Pane className="ibox-section">
        <h2>Converter</h2>
        <section className="dragcontainer">
          <div
            className="dropzone"
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            <p>Drag n drop your file here or click here to upload.</p>
          </div>
        </section>
      </Pane>
      {preview && preview.length > 0 && (
        <>
          <Pane {...controlProps}>
            <Button
              marginTop={20}
              height={100}
              width="100%"
              fontSize="30px"
              display="block"
              whiteSpace="nowrap"
              onClick={convertZip}
            >
              Download
            </Button>
          </Pane>

          <Pane className="ibox-section" marginTop="20px">
            <h2>Preview</h2>
            <ul className="preview">
              {preview.map((it, i) => {
                return (
                  <li key={i}>
                    <img src={it.img}></img>
                    <div>{it.key}</div>
                  </li>
                );
              })}
            </ul>
          </Pane>
        </>
      )}
      <Pane {...controlProps}>
        <Button
          marginTop={20}
          height={100}
          width="100%"
          fontSize="30px"
          display="block"
          whiteSpace="nowrap"
          onClick={convertZip}
        >
          Download
        </Button>
      </Pane>
      <Pane className="ibox-section" marginTop="20px">
        <h3>Usage</h3>
        <p>
          First, use the download button to download the files listed below. Put
          the files in the root directory of your website.
        </p>
        <ul>
          <li>android-chrome-512x512.png</li>
          <li>android-chrome-192x192.png</li>
          <li>apple-touch-icon.png</li>
          <li>favicon-32x32.png</li>
          <li>favicon-16x16.png</li>
          <li>favicon.ico</li>
          <li>site.webmanifest</li>
        </ul>
        <p>
          Next, copy the following link tags and paste them into the
          <code>head</code> of your HTML.
        </p>
        <pre className="html">
          <code dangerouslySetInnerHTML={{ __html: highlightCode }}></code>
        </pre>
        <Button marginTop={20} fontSize="20px" onClick={copyValue}>
          Copy
        </Button>
      </Pane>
      <style jsx>
        {`
          .preview {
            list-style: none;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
          }
          .preview li {
            padding: 0 30px 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
      <style jsx global>
        {`
          p code {
            background: #efefef;
            border: 1px solid #eaeaea;
            font-family: monaco, monospace;
            font-size: 0.75em;
            padding: 2px 8px;
            -webkit-border-radius: 3px;
          }

          pre {
            color: #353535;
            font-size: 14px;
            line-height: 1.4;
            margin: 20px 0;
            padding: 20px;
            background: white;
            border: 1px solid #e7e7e7;
            border-bottom: 1px solid #ddd;
            -webkit-box-shadow: 0 1px 3px 0 #eee;
            -webkit-border-radius: 3px;
          }

          pre code {
            font-family: monaco, monospace;
            font-size: 0.8em;
          }

          code .comment {
            color: #888;
          }
          code .init {
            color: #2f6fad;
          }
          code .string {
            color: #5890ad;
          }
          code .keyword {
            color: #8a6343;
          }
          code .number {
            color: #2f6fad;
          }
        `}
      </style>
      <style jsx global>{`
        .ibox-section {
          padding: 16px;
          border: 1px #e8e8e8 solid;
          border-radius: 3px;
          width: 100%;
        }
        .dragcontainer {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }

        .dragcontainer > p {
          font-size: 1rem;
        }

        .dragcontainer > em {
          font-size: 0.8rem;
        }

        .dragcontainer .dropzone {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 70px;
          border-width: 5px;
          border-radius: 2px;
          border-color: #eeeeee;
          border-style: dashed;
          background-color: #fafafa;
          color: #bdbdbd;
          outline: none;
          transition: border 0.24s ease-in-out;
        }

        .dragcontainer .dropzone:focus {
          border-color: #2196f3;
        }

        .dragcontainer .dropzone.disabled {
          opacity: 0.6;
        }
      `}</style>
    </ConversionLayout>
  );
}
