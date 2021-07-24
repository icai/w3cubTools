import ConversionLayout from "@components/ConversionLayout";
import React, { useState } from "react";
import Tween from "rc-tween-one";

export default function QiuQian() {
  /*
   * 注意：本程序中的“随机”都是伪随机概念。
   * 第一个种子相对固定，第二个种子相对有更多变化
   */
  function random(seed1, seed2) {
    var n = seed1 % 11117;
    for (var i = 0; i < 100 + seed2; i++) {
      n = n * n;
      n = n % 11117; // 11117 是个质数
    }
    return n;
  }

  var weeks = ["日", "一", "二", "三", "四", "五", "六"];
  function getTodayString() {
    return (
      "今天是" +
      today.getFullYear() +
      "年" +
      (today.getMonth() + 1) +
      "月" +
      today.getDate() +
      "日 星期" +
      weeks[today.getDay()]
    );
  }

  var today = new Date();
  var timeseed = today.getMilliseconds();

  /////////////////////////////////////////////////////////
  var results = [
    "超大吉",
    "大吉",
    "吉",
    "小吉",
    "平",
    "小凶",
    "凶",
    "大凶",
    "超大凶"
  ];
  var descriptions = ["", "", "", "", "", "", "", "", ""];
  var luck_rate = [10, 100, 500, 800, 300, 800, 500, 100, 10]; // 吉凶概率分布，总数为 3120

  function pickRandomWithRate(seed1, seed2) {
    var result = random(seed1, seed2) % 3120;
    var addup = 0;

    for (var i = 0; i < luck_rate.length; i++) {
      addup += luck_rate[i];
      if (result <= addup) {
        return {
          title: results[i],
          desc: descriptions[i]
        };
      }
    }
    return {
      title: " ",
      desc: ""
    };
  }

  /////////////////////////////////////////////////////////
  var selectedEvent = null;

  // TODO 概率分布
  function getNextCardText(slidecount) {
    return pickRandomWithRate(timeseed + selectedEvent, slidecount);
  }

  const [selected, setSelected] = useState(-1);
  const [actived, setActived] = useState(false);
  const [queues, setQueues] = useState([]);

  function slide() {
    let slidecount = queues.length;
    if (slidecount > 35) {
      return;
    }
    var duration =
      slidecount > 33
        ? 1500
        : slidecount > 32
        ? 800
        : slidecount > 25
        ? 400
        : slidecount > 20
        ? 200
        : slidecount > 15
        ? 150
        : 100;
    var cardInfo = getNextCardText(slidecount);
    setQueues([...queues, { ...cardInfo, duration }]);
  }

  const qiuEvents = [
    {
      name: "编码",
      event: 100
    },
    {
      name: "测试",
      event: 200
    },
    {
      name: "修复BUG",
      event: 300
    },
    {
      name: "提交代码",
      event: 400
    },
    {
      name: "其他",
      event: 500
    }
  ];

  const onQueueEnd = function() {
    slide();
  };

  const onClickRun = () => {
    setQueues([]);
    setActived(false);
    slide();
  };

  const handleQiu = (event: number, index: number) => {
    selectedEvent = event;
    setSelected(index);
    setActived(true);
    setQueues([]);
  };
  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <div className="q-container">
        <div className="title">程序员求签</div>
        <div className="info">
          <strong>求</strong>
          婚丧嫁娶亲友疾病编程测试升职跳槽陨石核弹各类吉凶
        </div>
        <div className="date">{getTodayString()}</div>
        <div className="check_luck">
          <ul style={{ marginTop: 0, paddingLeft: 30, lineHeight: "30px" }}>
            <li>编码测试修复提交之前求一签，可避凶趋吉</li>
            <li>选择所求之事并在心中默念，再单击“求”即可</li>
            <li>同一件事只能求一次，下次再求请刷新页面</li>
          </ul>
          <table className="event_table selecttable">
            <tbody>
              <tr>
                {qiuEvents.map((qiu, ix) => {
                  return (
                    <td
                      key={ix}
                      onClick={() => {
                        handleQiu(qiu.event, ix);
                      }}
                      className={selected == ix ? "selected" : ""}
                    >
                      {qiu.name}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="roll">
          <div className="card" style={{ top: "-1px", fontSize: "20pt" }}>
            请点击所求之事
          </div>
          {actived && (
            <Tween
              className="card clickable"
              componentProps={{
                className: "card clickable",
                onClick: onClickRun
              }}
              animation={{ top: "-1px", duration: 300 }}
            >
              <div className="title">求</div>
            </Tween>
          )}
          {queues.map((item, index) => {
            return (
              <Tween
                className="card"
                componentProps={{ className: "card" }}
                key={index}
                animation={{
                  top: "-1px",
                  duration: item.duration,
                  onComplete: onQueueEnd
                }}
              >
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></div>
              </Tween>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .q-container {
          width: 480px;
          margin: 0 auto 50px;
          font-size: 10pt;
          font-family: "Consolas", "Microsoft Yahei", Arial, sans-serif;
          > .title {
            color: #bbb;
            font-weight: bold;
            margin-bottom: 10px;
            background: #555;
            padding: 5px 15px;
            font-size: 120%;
          }
          .info {
            text-align: center;
            color: #dc143c;
            font-size: 9pt;
          }

          .info strong {
            background: crimson;
            color: white;
            padding: 0 3px;
            margin: 0 1px;
          }

          .date {
            font-size: 17pt;
            font-weight: bold;
            line-height: 30pt;
            text-align: center;
            border-bottom: 1px solid #999;
          }

          .check_luck {
            padding-top: 10px;
          }

          .selecttable {
            width: 100%;
          }

          .selecttable td {
            text-align: center;
            padding: 10px 0;
            margin: 1px;
            background: #ccc;
            cursor: pointer;
            width: 20%;
            border-radius: 2px;
          }

          .selecttable td:hover {
            background: #aaa;
          }

          .selecttable td.selected {
            background: #333;
            color: #fff;
          }

          .roll {
            height: 200px;
            border: 1px solid #faa;
            margin-top: 10px;
            overflow: hidden;
            position: relative;
          }

          .card {
            background: #ffffff;
            text-align: center;
            line-height: 200px;
            border-top: 1px solid #faa;
            position: absolute;
            top: 201px;
            width: 100%;
          }
          .card .title {
            font-size: 70pt;
            font-weight: bold;
          }
          .card.clickable {
            background: crimson;
            color: #ffffff;
            cursor: pointer;
          }
        }
      `}</style>
    </ConversionLayout>
  );
}
