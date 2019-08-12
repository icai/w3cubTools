import React, { useReducer } from "react";
import { Pane, Tablist, Tab, Text } from "evergreen-ui";
import VoiceComponent from "@components/icons/VoiceComponent";
export default function() {
  const [state, setState] = useReducer(
    (state, action) => {
      return {
        ...state,
        ...action
      };
    },
    {
      selectedIndex: 0,
      tabs: ["Hiragana", "Katakana"],
      Hiragana: [
        [
          ["あ", "い", "う", "え", "お"],
          ["か", "き", "く", "け", "こ"],
          ["さ", "し", "す", "せ", "そ"],
          ["た", "ち", "つ", "て", "と"],
          ["な", "に", "ぬ", "ね", "の"],
          ["は", "ひ", "ふ", "へ", "ほ"],
          ["ま", "み", "む", "め", "も"],
          ["や", "ゆ", "よ"],
          ["ら", "り", "る", "れ", "ろ"],
          ["わ", "を"],
          ["ん"]
        ],
        [
          ["が", "ぎ", "ぐ", "げ", "ご"],
          ["ざ", "じ", "ず", "ぜ", "ぞ"],
          ["だ", "ぢ", "づ", "で", "ど"],
          ["ば", "び", "ぶ", "べ", "ぼ"],
          ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
          ["きゃ", "きゅ", "きょ"],
          ["しゃ", "しゅ", "しょ"],
          ["ちゃ", "ちゅ", "ちょ"],
          ["にゃ", "にゅ", "にょ"],
          ["ひゃ", "ひゅ", "ひょ"],
          ["みゃ", "みゅ", "みょ"],
          ["りゃ", "りゅ", "りょ"],
          ["ぎゃ", "ぎゅ", "ぎょ"],
          ["じゃ", "じゅ", "じょ"],
          ["びゃ", "びゅ", "びょ"],
          ["ぴゃ", "ぴゅ", "ぴょ"]
        ]
      ],
      Katakana: [
        [
          ["ア", "イ", "ウ", "エ", "オ"],
          ["カ", "キ", "ク", "ケ", "コ"],
          ["サ", "シ", "ス", "セ", "ソ"],
          ["タ", "チ", "ツ", "テ", "ト"],
          ["ナ", "ニ", "ヌ", "ネ", "ノ"],
          ["ハ", "ヒ", "フ", "ヘ", "ホ"],
          ["マ", "ミ", "ム", "メ", "モ"],
          ["ヤ", "ユ", "ヨ"],
          ["ラ", "リ", "ル", "レ", "ロ"],
          ["ワ", "ヲ"],
          ["ン"]
        ],
        [
          ["ガ", "ギ", "グ", "ゲ", "ゴ"],
          ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
          ["ダ", "ヂ", "ヅ", "デ", "ド"],
          ["バ", "ビ", "ブ", "ベ", "ボ"],
          ["パ", "ピ", "プ", "ペ", "ポ"],
          ["キャ", "キュ", "キョ"],
          ["シャ", "シュ", "ショ"],
          ["チャ", "チュ", "チョ"],
          ["ニャ", "ニュ", "ニョ"],
          ["ヒャ", "ヒュ", "ヒョ"],
          ["ミャ", "ミュ", "ミョ"],
          ["リャ", "リュ", "リョ"],
          ["ギャ", "ギュ", "ギョ"],
          ["ジャ", "ジュ", "ジョ"],
          ["ビャ", "ビュ", "ビョ"],
          ["ピャ", "ピュ", "ピョ"]
        ]
      ],
      yin: [
        [
          ["a", "i", "u", "e", "o"],
          ["ka", "ki", "ku", "ke", "ko"],
          ["sa", "shi", "su", "se", "so"],
          ["ta", "chi", "tsu", "te", "to"],
          ["na", "ni", "nu", "ne", "no"],
          ["ha", "hi", "fu", "he", "ho"],
          ["ma", "mi", "mu", "me", "mo"],
          ["ya", "yu", "yo"],
          ["ra", "ri", "ru", "re", "ro"],
          ["wa", "o"],
          ["n"]
        ],
        [
          ["ga", "gi", "gu", "ge", "go"],
          ["za", "ji", "zu", "ze", "zo"],
          ["da", "ji", "zu", "de", "do"],
          ["ba", "bi", "bu", "be", "bo"],
          ["pa", "pi", "pu", "pe", "po"],
          ["kya", "kyu", "kyo"],
          ["sha", "shu", "sho"],
          ["cha", "chu", "cho"],
          ["nya", "nyu", "nyo"],
          ["hya", "hyu", "hyo"],
          ["mya", "myu", "myo"],
          ["rya", "ryu", "ryo"],
          ["gya", "gyu", "gyo"],
          ["ja", "ju", "jo"],
          ["bya", "byu", "byo"],
          ["pya", "pyu", "pyo"]
        ]
      ]
    }
  );
  const cardClick = (yin, _word) => {
    var n = (document.getElementById("au-" + yin) ||
      document.createElement("audio")) as HTMLAudioElement;
    n.id = "au-" + yin;
    document.body.appendChild(n);
    if (yin.length == 1) {
      yin = yin + yin;
    }
    n.src = `https://raw.githubusercontent.com/icai/tts-japanese/master/dist/${yin}.mp3`;
    n.loop = false;
    n.play();
  };
  const preloadVoice = (yin, _word) => {
    var n = (document.getElementById("au-" + yin) ||
      document.createElement("audio")) as HTMLAudioElement;
    n.id = "au-" + yin;
    document.body.appendChild(n);
    if (yin.length == 1) {
      yin = yin + yin;
    }
    n.src = `https://raw.githubusercontent.com/icai/tts-japanese/master/dist/${yin}.mp3`;
    n.style.display = "none";
  };
  const cc = line => {
    return line.length == 1 ? { justifyContent: "flex-end" } : {};
  };
  return (
    <Pane width="800px" height="100%" margin="auto">
      <Pane>
        <h2 className="hidden-print" style={{ marginLeft: "40px" }}>
          Japanese Syllabaries
        </h2>
        <Pane>
          <Tablist
            className="hidden-print"
            marginBottom={5}
            flexBasis={240}
            textAlign={"right"}
            marginRight={34}
          >
            {state.tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => setState({ selectedIndex: index })}
                isSelected={index === state.selectedIndex}
                aria-controls={`panel-${tab}`}
                style={{ height: "40px" }}
              >
                <h3>{tab}</h3>
              </Tab>
            ))}
          </Tablist>
          <Pane padding={16} background="#fff" flex="1">
            {state.tabs.map((tab, index) => (
              <Pane
                key={tab}
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={tab}
                aria-hidden={index !== state.selectedIndex}
                display={index === state.selectedIndex ? "block" : "none"}
              >
                <Pane display="flex" alignItems="flex-start">
                  {state[tab].map((col, ix) => (
                    <Pane
                      key={ix}
                      flex="1 1 50%"
                      flexWrap="wrap"
                      display="flex"
                      padding={0}
                      marginX={20}
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      {col.map((line, li) => (
                        <Pane
                          key={li}
                          flex="1 1 100%"
                          display="flex"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          {...cc(line)}
                        >
                          {line.map((word, wi) => (
                            <Pane
                              key={wi}
                              margin={1}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              padding={8}
                              minWidth={54}
                              flexDirection="column"
                              onClick={() => {
                                cardClick(state.yin[ix][li][wi], word);
                              }}
                              onMouseEnter={() => {
                                preloadVoice(state.yin[ix][li][wi], word);
                              }}
                              className="ja-word"
                            >
                              <Text fontSize={"32px"}>{word}</Text>
                              <Text color="#69BF61" marginTop={8}>
                                {state.yin[ix][li][wi]}
                              </Text>
                              <div className="voice-ico">
                                <svg>
                                  <use xlinkHref="#icon-voice" />
                                </svg>
                              </div>
                            </Pane>
                          ))}
                        </Pane>
                      ))}
                    </Pane>
                  ))}
                </Pane>
              </Pane>
            ))}
          </Pane>
          <div style={{ display: "none" }}>
            <VoiceComponent
              id="icon-voice"
              color="#fff"
              width="30"
              height="30"
            ></VoiceComponent>
          </div>
        </Pane>
      </Pane>

      <style jsx global>{`
        .ja-word {
          border: 1px solid #69bf61;
          cursor: pointer;
          border-radius: 5px;
          position: relative;
          overflow: hidden;
          .voice-ico {
            position: absolute;
            background: #457940;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            opacity: 0.5;
            display: none;
            > svg {
              width: 30px;
              height: 30px;
            }
          }
          &:hover {
            .voice-ico {
              display: flex;
            }
          }
        }
        @media print {
          .ja-word {
          }
        }
      `}</style>
    </Pane>
  );
}
