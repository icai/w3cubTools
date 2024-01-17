import ConversionLayout from "@components/ConversionLayout";
import React, { useEffect, useState } from "react";
import { Button, Pane, Checkbox } from "evergreen-ui";
import JSZip from "jszip";
import { useDropzone } from "react-dropzone";

interface AcceptedFile extends File {
  checked: boolean;
  _data: { uncompressedSize: number };
}

export default function UnzipOnline() {
  const controlProps: any = {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 5%",
    flexWrap: "wrap",
    height: "100%",
    padding: "0px",
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "application/zip",
  });

  const [accFiles, setAccFiles] = useState<AcceptedFile[]>([]);
  const [filesToDownload, setFilesToDownload] = useState<AcceptedFile[]>([]);

  const setCheckState = (name: string, state: boolean) => {
    let news = accFiles.map((item) => {
      if (item.name === name) {
        item.checked = state;
      }
      return item;
    });
    setAccFiles(news);
  };

  const files = accFiles.map((file: AcceptedFile) => (
    <li
      key={file.name}
      style={{ verticalAlign: "top", lineHeight: "30px", display: "block" }}
    >
      <Checkbox
        checked={file.checked}
        label={`${file.name} - ${file._data.uncompressedSize} bytes`}
        onChange={(e) => setCheckState(file.name, e.target.checked)}
      />
    </li>
  ));

  const saveFileTo = () => {
    filesToDownload.forEach(function (item) {
      let filename = item.name;
      // @ts-ignore
      item.async("blob").then(function (fileData) {
        saveAs(fileData, filename);
      });
    });
  };

  useEffect(() => {
    if (!acceptedFiles.length) {
      return;
    }

    const zip = new JSZip();

    zip
      .loadAsync(acceptedFiles[0], {
        checkCRC32: true,
      })
      .then(function (loadedZip) {
        let acFiles: AcceptedFile[] = [];

        loadedZip.forEach(function (_relativePath, zipEntry: any) {
          if (zipEntry._data.uncompressedSize > 100) {
            zipEntry.checked = true;
          } else {
            zipEntry.checked = false;
          }
          acFiles.push(zipEntry as AcceptedFile);
        });

        setAccFiles(acFiles);
      });
  }, [acceptedFiles]);

  useEffect(() => {
    setFilesToDownload(accFiles.filter((item) => item.checked));
  }, [accFiles]);

  return (
    <div>
      <ConversionLayout flexDirection="column" layoutHeight="auto">
        <div className="ibox-section">
          <section className="dragcontainer">
            <div
              className="dropzone"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        </div>
        <Pane {...controlProps}>
          <Button
            marginTop={20}
            height={100}
            width="100%"
            fontSize="30px"
            display="block"
            whiteSpace="nowrap"
            onClick={saveFileTo}
          >
            Download selected unzip Files
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
    </div>
  );
}
