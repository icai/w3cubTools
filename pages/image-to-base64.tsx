import ConversionLayout from "@components/ConversionLayout";
import React, { useEffect, useState, Fragment } from "react";
//@ts-ignore
import { Button, Pane, FilePicker, Textarea } from "evergreen-ui";

export default function() {
  const defChildProps = {
    display: "flex",
    flexDirection: "column" as any,
    flex: "1",
    flexWrap: "wrap",
    height: "100%"
  };

  const [base64, setBase64] = useState("");
  const [imgSource, setImgSource] = useState("");
  const [cssSource, setCssSource] = useState("");

  const readFile = (files: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function() {
      setBase64(this.result as any);
    };
  };

  const select = e => {
    e.target.select();
  };

  useEffect(() => {
    setImgSource(`<img src="${base64}" alt=""/>`);
    setCssSource(`background-image: url(${base64})`);
  }, [base64]);

  const results = [
    {
      title: "Base64 String",
      value: base64
    },
    {
      title: "Image Source",
      value: imgSource
    },
    {
      title: "CSS background Source",
      value: cssSource
    }
  ];

  return (
    <ConversionLayout flexDirection="column" layoutHeight="600px">
      <Pane>
        <div className="clearfix">
          <FilePicker
            multiple={false}
            float="right"
            name="img-base64"
            width={250}
            marginBottom={32}
            onChange={files => readFile(files)}
          />
        </div>
        <Pane {...defChildProps} flexDirection="row">
          <Pane {...defChildProps}>
            <Pane display="flex">
              <h3>Preview</h3>
            </Pane>
            <Pane
              display="flex"
              justifyContent="center"
              height="500px"
              alignItems="center"
            >
              <img src={base64} height="400" width="auto" alt="" />
            </Pane>
          </Pane>
          <Pane {...defChildProps}>
            {results.map((item: any, idx) => {
              return (
                <Pane key={idx}>
                  <h3>{item.title}</h3>
                  <Textarea
                    value={item.value}
                    onChange={() => {}}
                    height="120px"
                    onClick={select}
                  ></Textarea>
                </Pane>
              );
            })}
          </Pane>
        </Pane>
      </Pane>
    </ConversionLayout>
  );
}
