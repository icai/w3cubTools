import React, { useEffect, useState } from "react";
import { Button, Pane } from "evergreen-ui";
import JSZip from "jszip";
import { useDropzone } from "react-dropzone";
import uniqBy from "lodash/uniqBy";
import { getDate } from "@utils/utils";
import ConversionLayout from "@components/ConversionLayout";

interface FileItem {
  path: string;
  size: number;
  name: string;
}

export default function ZipOnline() {
  const controlProps: any = {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 5%",
    flexWrap: "wrap",
    height: "100%",
    padding: "0px",
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [accFiles, setAccFiles] = useState<FileItem[]>([]);

  const files = accFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const convertZip = () => {
    var zip = new JSZip();
    const proList = accFiles.map((file) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const result = reader.result as string | ArrayBuffer;
          zip.file(file.name, result, { binary: true });
          resolve();
        };
        // @ts-ignore
        reader.readAsBinaryString(file);
      });
    });
    let time = getDate();
    proList.push(
      new Promise<void>((resolve) => {
        zip.file(
          "readme.md",
          "Thinks using " + window.location.href + `\n\nGenerate at ${time}`
        );
        resolve();
      })
    );
    Promise.all(proList).then(() => {
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `w3cubtools.genzip.${time}.zip`);
      });
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
          onClick={() => {
            convertZip();
          }}
        >
          Convert to Zip File
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
