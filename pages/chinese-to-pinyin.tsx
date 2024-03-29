// 中文转拼音

import ConversionLayout from "@components/ConversionLayout";
import { Button } from "evergreen-ui";
import { converttoNoTone } from "@utils/utils";
import React, { useState, useCallback, useEffect } from "react";
import VoiceComponent from "@components/icons/VoiceComponent";

export default function ChineseToPinyin() {
  let audioRef = React.createRef() as any;
  const pinyinVoice = useCallback((value: string) => {
    let t = `https://s1-hono.w3cub.com/api/fanyi?text=${encodeURI(
      value
    )}`;
    var n = audioRef;
    n.src = t;
    n.loop = false;
    n.play();
  }, []);
  return (
    <>
      <ConversionLayout
        flexDirection="column"
        transformer={({ value, setResult, setValue }) => {
          return (
            <>
              <Button
                marginRight={10}
                height={40}
                margin="5px"
                display="block"
                whiteSpace="nowrap"
                onClick={() => setResult(transPinyin(value))}
              >
                中文转拼音
              </Button>
              <Button
                marginRight={10}
                height={40}
                margin="5px"
                display="block"
                whiteSpace="nowrap"
                onClick={() => setResult(converttoNoTone(transPinyin(value)))}
              >
                中文转拼音（数字声调）
              </Button>
              <Button
                marginRight={10}
                height={40}
                margin="5px"
                display="block"
                whiteSpace="nowrap"
                onClick={() => pinyinVoice(value)}
              >
                朗读{" "}
                <VoiceComponent
                  style={{ verticalAlign: "middle" }}
                  width={16}
                  height={16}
                ></VoiceComponent>
              </Button>

              <Button
                marginRight={10}
                height={40}
                margin="5px"
                intent="danger"
                appearance="primary"
                display="block"
                whiteSpace="nowrap"
                onClick={() => {
                  setResult("");
                  setValue("");
                }}
              >
                清空全部
              </Button>
            </>
          );
        }}
        defaultValue="一本正经地胡说八道"
      />
      <div style={{ display: "none" }}>
        <audio
          id="audio"
          ref={input => {
            audioRef = input;
          }}
        ></audio>
      </div>
    </>
  );
}
