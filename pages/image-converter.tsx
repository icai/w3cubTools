import ConversionLayout from "@components/ConversionLayout";
import React, { useEffect, useState } from "react";
import { Button, Pane } from "evergreen-ui";
import { useDropzone } from "react-dropzone";
import uniqBy from "lodash/uniqBy";

export default function ImageConverter() {
  const controlProps = {
    display: "flex",
    flexDirection: "row" as any,
    flex: "0 0 5%",
    flexWrap: "wrap" as any,
    height: "100%",
    padding: "10px",
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
  });

  const [accFiles, setAccFiles] = useState([]);

  const files = accFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileDownloadCB = (blob: Blob, name: string) => {
    try {
      saveAs(blob, name);
    } catch (e) {
      // console.info(e);
    }
  };

  const saveImageTo = (type: string) => {
    accFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const image = new Image();
        image.onload = function () {
          const canvas = document.createElement(
            "canvas"
          ) as HTMLCanvasElement;
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas?.getContext("2d");
          if (!context) {
            console.error("Canvas context is null or undefined");
            return;
          }
          context.drawImage(image, 0, 0);
          canvas.toBlob((blob) => {
            const lparenIdx = file.name.lastIndexOf(".");
            let fileName;
            if (lparenIdx !== -1) {
              fileName =
                file.name.substring(0, lparenIdx) + "." + type;
            } else {
              fileName = file.name + "." + type;
            }
            // @ts-ignore
            fileDownloadCB(blob, fileName);
          }, "type/" + type);
        };
        image.src = reader.result as any;
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    // @ts-ignore
    setAccFiles(uniqBy([...accFiles, ...acceptedFiles], "name"));
  }, [acceptedFiles]);

  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <div className="ibox-section">
        <section className="dragcontainer">
          <div
            className="dropzone"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      </div>
      <Pane {...controlProps}>
        <Button
          marginRight={10}
          height={40}
          margin="5px"
          display="block"
          whiteSpace="nowrap"
          onClick={() => {
            saveImageTo("jpg");
          }}
        >
          Convert to JPG
        </Button>
        <Button
          marginRight={10}
          height={40}
          margin="5px"
          display="block"
          whiteSpace="nowrap"
          onClick={() => {
            saveImageTo("png");
          }}
        >
          Convert to PNG
        </Button>
        <Button
          marginRight={10}
          height={40}
          margin="5px"
          display="block"
          whiteSpace="nowrap"
          onClick={() => {
            saveImageTo("gif");
          }}
        >
          Convert to GIF
        </Button>
        <Button
          marginRight={10}
          height={40}
          margin="5px"
          display="block"
          whiteSpace="nowrap"
          onClick={() => {
            saveImageTo("bmp");
          }}
        >
          Convert to BMP
        </Button>
      </Pane>
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
