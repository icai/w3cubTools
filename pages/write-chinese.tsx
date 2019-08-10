import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect
} from "react";
import { Pane } from "evergreen-ui";
import WriteCharactorSearch from "@components/WriteCharactor/WriteCharactorSearch";
import chinese from "@constants/chinese.json";
import { converttoNoTone } from "@utils/utils";
import VoiceComponent from "@components/icons/VoiceComponent";
let time = 0;
let reqFrame;
let paths = [];
const BOARD_CELL_SIZE = 298;
const BOARD_SIZE = 3;
const PADDING = 2;
const LAYOUT_SIZE = 600;
const commonWords = `的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞`;

export default function() {
  const [char, setChar] = useState("");
  const [pinyin, setPinyin] = useState("");
  const onSearch = slug => {
    if (char && slug == char) {
      location.reload();
    }
    cancelAnimationFrame(reqFrame);
    paths = [];

    if (slug) {
      slug = slug.slice(0, 1);
      if (chinese[slug]) {
        paths = JSON.parse(JSON.stringify(chinese[slug]));
        location.hash = "#/" + slug;
        setChar(slug);
      }
    } else {
      paths = [];
      if (window.history.pushState) {
        window.history.pushState("", "/", window.location.pathname);
      } else {
        window.location.hash = "";
      }
      setChar("");
    }
  };

  const toTop = () => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  };
  const draw = startTime => {
    if (!__CLIENT__) {
      return;
    }
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4;
    //画田字格
    var drawBoard = function() {
      ctx.setLineDash([]);
      ctx.strokeStyle = "red"; // red
      for (var i = 0; i < BOARD_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(PADDING + i * BOARD_CELL_SIZE, PADDING);
        ctx.lineTo(
          PADDING + i * BOARD_CELL_SIZE,
          BOARD_CELL_SIZE * BOARD_SIZE - PADDING
        );
        ctx.stroke();
        ctx.moveTo(PADDING, PADDING + i * BOARD_CELL_SIZE);
        ctx.lineTo(
          BOARD_CELL_SIZE * BOARD_SIZE - PADDING,
          PADDING + i * BOARD_CELL_SIZE
        );
        ctx.stroke();
      }

      // X
      ctx.beginPath();
      ctx.setLineDash([5, 15]);
      ctx.moveTo(0, 0);
      ctx.lineTo(600, 600);
      ctx.stroke();
      // X
      ctx.beginPath();
      ctx.setLineDash([5, 15]);
      ctx.moveTo(600, 0);
      ctx.lineTo(0, 600);
      ctx.stroke();

      ctx.closePath();
    };
    drawBoard();
    const drawWord = thepaths => {
      if (startTime !== time) {
        return;
      }
      var vertices = [];
      if (thepaths.length > 0) {
        vertices = thepaths.shift();
      } else {
        return;
      }
      // calculate incremental points along the path
      var points = calcWaypoints(vertices);
      // extend the line from start to finish with animation
      // calc waypoints traveling along vertices
      function calcWaypoints(vertices) {
        var waypoints = [];
        var fps = 50;
        var len = vertices.length;
        if (len > 3) {
          fps = 40;
        }
        for (var i = 1; i < len; i++) {
          var pt0 = vertices[i - 1];
          var pt1 = vertices[i];
          var dx = pt1[0] - pt0[0];
          var dy = pt1[1] - pt0[1];
          for (var j = 0; j < fps; j++) {
            var x = pt0[0] + (dx * j) / fps;
            var y = pt0[1] + (dy * j) / fps;
            waypoints.push({
              x: x,
              y: y
            });
          }
        }
        return waypoints;
      }
      var t = 1;
      function animate() {
        if (startTime !== time) {
          cancelAnimationFrame(reqFrame);
          return;
        }
        ctx.lineCap = "round";
        ctx.lineWidth = 15;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(points[t - 1].x, points[t - 1].y);
        ctx.lineTo(points[t].x, points[t].y);
        ctx.stroke();

        if (t < points.length - 1) {
          reqFrame = requestAnimationFrame(animate);
        } else {
          drawWord(thepaths);
        }
        t++;
      }
      animate();
    };
    if (char && paths && paths.length) {
      drawWord(paths);
    }
  };
  let audioRef = React.createRef() as any;
  useEffect(() => {
    time = new Date().getTime();
    draw(time);

    try {
      if (!char) return;
      let py = transPinyin(char);
      setPinyin(py);
      let tone = converttoNoTone(py).trim();
      let t = `https://raw.githubusercontent.com/icai/tts-chinese/master/dist/${tone}.mp3`;
      var n = audioRef;
      n.setAttribute("datasrc", t);
    } catch (e) {}
  }, [char]);

  useEffect(() => {
    let path = decodeURIComponent(location.hash.slice(2));
    onSearch(path);
  }, []);

  const onVoiceHover = () => {
    var n = audioRef;
    n.src = n.getAttribute("datasrc");
  };

  const onVoiceClick = () => {
    var n = audioRef;
    n.loop = false;
    n.play();
  };

  return (
    <Pane width="800px" height="100%" margin="auto">
      <WriteCharactorSearch
        char={char}
        onSearch={onSearch}
      ></WriteCharactorSearch>
      <Pane
        className="clearfix"
        width={"600px"}
        margin={"auto"}
        paddingTop={50}
      >
        <canvas id="canvas" width={LAYOUT_SIZE} height={LAYOUT_SIZE}></canvas>
      </Pane>
      <Pane lineHeight="32px" fontSize="18px">
        拼 音: {pinyin}{" "}
        <VoiceComponent
          style={{ verticalAlign: "middle", cursor: "pointer" }}
          onMouseEnter={onVoiceHover}
          onClick={onVoiceClick}
        ></VoiceComponent>
      </Pane>
      <div className="text-right">
        <a
          href="https://github.com/w3cub/w3cubtools-md/issues"
          target="_blank"
          className="word"
        >
          Report an error
        </a>
      </div>
      <h3>常用字</h3>
      <Pane>
        {commonWords.split("").map(word => {
          return (
            <a
              href="javascript:;"
              className="word"
              key={word}
              onClick={() => {
                toTop();
                setTimeout(() => {
                  onSearch(word);
                }, 500);
              }}
            >
              {word}
            </a>
          );
        })}
      </Pane>
      <div style={{ display: "none" }}>
        <audio
          id="audio"
          ref={input => {
            audioRef = input;
          }}
        ></audio>
      </div>

      <style jsx>{`
        .word {
          margin-right: 20px;
          line-height: 25px;
          color: #000;
        }
      `}</style>
    </Pane>
  );
}
