import ConversionLayout from "@components/ConversionLayout";
import React, { useEffect, useState } from "react";

interface Event {
  name: string;
  good: string;
  bad: string;
  weekend?: boolean;
}

interface SpecialEvent {
  date: number;
  type: string;
  name: string;
  description: string;
}

export default function HuangLi() {
  /*
   * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
   */
  function random(dayseed: number, indexseed: number): number {
    let n = dayseed % 11117;
    for (let i = 0; i < 100 + indexseed; i++) {
      n = n * n;
      n = n % 11117; // 11117 is a prime number
    }
    return n;
  }

  const today = new Date();
  const iday =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const weeks: string[] = ["日", "一", "二", "三", "四", "五", "六"];
  const directions: string[] = [
    "北方",
    "东北方",
    "东方",
    "东南方",
    "南方",
    "西南方",
    "西方",
    "西北方",
  ];

  const activities: Event[] = [
    {
      name: "写单元测试",
      good: "写单元测试将减少出错",
      bad: "写单元测试会降低你的开发效率"
    },
    {
      name: "洗澡",
      good: "你几天没洗澡了？",
      bad: "会把设计方面的灵感洗掉",
      weekend: true
    },
    {
      name: "锻炼一下身体",
      good: "",
      bad: "能量没消耗多少，吃得却更多",
      weekend: true
    },
    {
      name: "抽烟",
      good: "抽烟有利于提神，增加思维敏捷",
      bad: "除非你活够了，死得早点没关系",
      weekend: true
    },
    {
      name: "白天上线",
      good: "今天白天上线是安全的",
      bad: "可能导致灾难性后果"
    },
    { name: "重构", good: "代码质量得到提高", bad: "你很有可能会陷入泥潭" },
    { name: "使用%t", good: "你看起来更有品位", bad: "别人会觉得你在装逼" },
    {
      name: "跳槽",
      good: "该放手时就放手",
      bad: "鉴于当前的经济形势，你的下一份工作未必比现在强"
    },
    {
      name: "招人",
      good: "你面前这位有成为牛人的潜质",
      bad: "这人会写程序吗？"
    },
    { name: "面试", good: "面试官今天心情很好", bad: "面试官不爽，会拿你出气" },
    {
      name: "提交辞职申请",
      good: "公司找到了一个比你更能干更便宜的家伙，巴不得你赶快滚蛋",
      bad: "鉴于当前的经济形势，你的下一份工作未必比现在强"
    },
    { name: "申请加薪", good: "老板今天心情很好", bad: "公司正在考虑裁员" },
    {
      name: "晚上加班",
      good: "晚上是程序员精神最好的时候",
      bad: "",
      weekend: true
    },
    {
      name: "在妹子面前吹牛",
      good: "改善你矮穷挫的形象",
      bad: "会被识破",
      weekend: true
    },
    {
      name: "撸管",
      good: "避免缓冲区溢出",
      bad: "强撸灰飞烟灭",
      weekend: true
    },
    {
      name: "浏览成人网站",
      good: "重拾对生活的信心",
      bad: "你会心神不宁",
      weekend: true
    },
    { name: '命名变量"%v"', good: "", bad: "" },
    {
      name: "写超过%l行的方法",
      good: "你的代码组织的很好，长一点没关系",
      bad: "你的代码将混乱不堪，你自己都看不懂"
    },
    {
      name: "提交代码",
      good: "遇到冲突的几率是最低的",
      bad: "你遇到的一大堆冲突会让你觉得自己是不是时间穿越了"
    },
    {
      name: "代码复审",
      good: "发现重要问题的几率大大增加",
      bad: "你什么问题都发现不了，白白浪费时间"
    },
    {
      name: "开会",
      good: "写代码之余放松一下打个盹，有益健康",
      bad: "小心被扣屎盆子背黑锅"
    },
    {
      name: "打DOTA",
      good: "你将有如神助",
      bad: "你会被虐的很惨",
      weekend: true
    },
    {
      name: "晚上上线",
      good: "晚上是程序员精神最好的时候",
      bad: "你白天已经筋疲力尽了"
    },
    {
      name: "修复BUG",
      good: "你今天对BUG的嗅觉大大提高",
      bad: "新产生的BUG将比修复的更多"
    },
    {
      name: "设计评审",
      good: "设计评审会议将变成头脑风暴",
      bad: "人人筋疲力尽，评审就这么过了"
    },
    { name: "需求评审", good: "", bad: "" },
    {
      name: "上微博",
      good: "今天发生的事不能错过",
      bad: "今天的微博充满负能量",
      weekend: true
    },
    {
      name: "上AB站",
      good: "还需要理由吗？",
      bad: "满屏兄贵亮瞎你的眼",
      weekend: true
    },
    {
      name: "玩FlappyBird",
      good: "今天破纪录的几率很高",
      bad: "除非你想玩到把手机砸了",
      weekend: true
    }
  ];

  const specials: SpecialEvent[] = [
    {
      date: 20140214,
      type: "bad",
      name: "待在男（女）友身边",
      description: "脱团火葬场，入团保平安。",
    }
  ];

  const tools: string[] = [
    "Eclipse写程序",
    "MSOffice写文档",
    "记事本写程序",
    "Windows8",
    "Linux",
    "MacOS",
    "IE",
    "Android设备",
    "iOS设备",
  ];

  const varNames: string[] = [
    "jieguo",
    "huodong",
    "pay",
    "expire",
    "zhangdan",
    "every",
    "free",
    "i1",
    "a",
    "virtual",
    "ad",
    "spider",
    "mima",
    "pass",
    "ui",
  ];

  const drinks: string[] = [
    "水",
    "茶",
    "红茶",
    "绿茶",
    "咖啡",
    "奶茶",
    "可乐",
    "鲜奶",
    "豆奶",
    "果汁",
    "果味汽水",
    "苏打水",
    "运动饮料",
    "酸奶",
    "酒",
  ];

  function is_someday(): boolean {
    return today.getMonth() === 5 && today.getDate() === 4;
  }

  function getTodayString(): string {
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

  function star(num: number): string {
    let result = "";
    let i = 0;
    while (i < num) {
      result += "★";
      i++;
    }
    while (i < 5) {
      result += "☆";
      i++;
    }
    return result;
  }

  function filter(activities: Event[]): Event[] {
    let result: Event[] = [];

    if (isWeekend()) {
      for (let i = 0; i < activities.length; i++) {
        if (activities[i].weekend) {
          result.push(activities[i]);
        }
      }

      return result;
    }

    return activities;
  }

  function isWeekend(): boolean {
    return today.getDay() === 0 || today.getDay() === 6;
  }

  // 从 activities 中随机挑选 size 个
  function pickRandomActivity(activities: Event[], size: number): Event[] {
    let picked_events = pickRandom(activities, size);

    for (let i = 0; i < picked_events.length; i++) {
      picked_events[i] = parse(picked_events[i]);
    }

    return picked_events;
  }

  // 从数组中随机挑选 size 个
  function pickRandom(array: any[], size: number): any[] {
    let result: any[] = [];

    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }

    for (let j = 0; j < array.length - size; j++) {
      let index = random(iday, j) % result.length;
      result.splice(index, 1);
    }

    return result;
  }

  // 解析占位符并替换成随机内容
  function parse(event: Event): Event {
    let result: Event = { ...event };

    if (result.name.indexOf("%v") !== -1) {
      result.name = result.name.replace(
        "%v",
        varNames[random(iday, 12) % varNames.length]
      );
    }

    if (result.name.indexOf("%t") !== -1) {
      result.name = result.name.replace(
        "%t",
        tools[random(iday, 11) % tools.length]
      );
    }

    if (result.name.indexOf("%l") !== -1) {
      result.name = result.name.replace(
        "%l",
        ((random(iday, 12) % 247) + 30).toString()
      );
    }

    return result;
  }

  const _activities = filter(activities);
  const numGood = (random(iday, 98) % 3) + 2;
  const numBad = (random(iday, 87) % 3) + 2;
  const eventArr = pickRandomActivity(_activities, numGood + numBad);

  const [goods, setGoods] = useState<Event[]>(eventArr.slice(0, numGood));
  const [bads, setBads] = useState<Event[]>(eventArr.slice(numGood));
  const [todaystr, setToday] = useState<string>(getTodayString());
  const [direction, setDirection] = useState<string>(
    directions[random(iday, 2) % directions.length]
  );
  const [drink, setDrink] = useState<string>(pickRandom(drinks, 2).join("，"));
  const [starscore, setStarScore] = useState<string>(
    star((random(iday, 6) % 5) + 1)
  );

  useEffect(() => {
    setToday(getTodayString());
    setGoods(eventArr.slice(0, numGood));
    setBads(eventArr.slice(numGood));
    setDirection(directions[random(iday, 2) % directions.length]);
    setDrink(pickRandom(drinks, 2).join("，"));
    setStarScore(star((random(iday, 6) % 5) + 1));
  }, []);

  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <div className="lunar-container">
        <div className="title">程序员老黄历</div>
        <div className="date">{todaystr}</div>
        <div className="good">
          <div className="title">
            <table>
              <tbody>
                <tr>
                  <td>宜</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content">
            <ul>
              {goods.map((event: any, ix) => {
                return (
                  <li key={ix}>
                    <div className="name">{event.name}</div>
                    <div className="description">{event.good}</div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="clear" />
        </div>
        <div className="split" />
        <div className="bad">
          <div className="title">
            <table>
              <tbody>
                <tr>
                  <td>不宜</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content">
            <ul>
              {bads.map((event: any, ix) => {
                return (
                  <li key={ix}>
                    <div className="name">{event.name}</div>
                    <div className="description">{event.good}</div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="clear" />
        </div>
        <div className="split" />
        <div className="line-tip">
          <strong>座位朝向：</strong>面向
          <span className="direction_value">{direction}</span>
          写程序，BUG 最少。
        </div>
        <div className="line-tip">
          <strong>今日宜饮：</strong>
          <span className="drink_value">{drink}</span>
        </div>
        <div className="line-tip">
          <strong>女神亲近指数：</strong>
          <span className="goddes_value">{starscore}</span>
        </div>
        <div className="adlink">
          <a href="/qiuqian" target="_self">
            想求签？
          </a>
        </div>
        <div className="comment">
          <ul>
            <li>本老黄历仅面向程序员；</li>
            <li>本老黄历内容是程序生成的，因为只有这样程序员才会信。</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .lunar-container {
          width: 480px;
          margin: 0 auto 50px;
          display: block;
          font-family: "Consolas", "Microsoft Yahei", Arial, sans-serif;
        }

        .lunar-container > .title {
          color: #bbb;
          font-weight: bold;
          margin-bottom: 10px;
          background: #555;
          padding: 5px 15px;
        }

        .adlink {
          text-align: center;
          font-size: 11pt;
        }

        .adlink a {
          text-decoration: none;
          display: block;
          color: #666;
          font-weight: bold;
          margin-bottom: 10px;
          background: #eee;

          padding: 10pt;
          margin-top: 10pt;
        }

        .date {
          font-size: 17pt;
          font-weight: bold;
          line-height: 30pt;
          text-align: center;
        }

        .split,
        .clear {
          clear: both;
          height: 1px;
          overflow-y: hidden;
        }

        .good,
        .bad {
          clear: both;
          position: relative;
        }

        .bad {
          /*top: -1px;*/
        }

        .good .title,
        .bad .title {
          float: left;
          width: 100px;
          font-weight: bold;
          text-align: center;
          font-size: 30pt;
          position: absolute;
          top: 0;
          bottom: 0;
        }

        .good .title > table,
        .bad .title > table {
          position: absolute;
          width: 100%;
          height: 100%;
          border: none;
        }

        .good .title {
          background: #ffee44;
        }

        .someday .good .title {
          background: #aaaaaa;
        }

        .bad .title {
          background: #ff4444;
          color: #fff;
        }

        .someday .bad .title {
          background: #666666;
          color: #fff;
        }

        .good .content,
        .bad .content {
          margin-left: 115px;
          padding-right: 10px;
          padding-top: 1px;
          font-size: 15pt;
        }

        .someday .good {
          background: #dddddd;
        }

        .someday .bad {
          background: #aaaaaa;
        }

        .good {
          background: #ffffaa;
        }

        .bad {
          background: #ffddd3;
        }

        .content ul {
          list-style: none;
          margin: 10px 0 0;
          padding: 0;
        }

        .content ul li {
          line-height: 150%;
          font-size: 15pt;
          font-weight: bold;
          color: #444;
        }

        .content ul li div.description {
          font-size: 11pt;
          font-weight: normal;
          color: #777;
          line-height: 110%;
          margin-bottom: 10px;
        }

        .line-tip {
          font-size: 11pt;
          margin-top: 10px;
          margin-left: 10px;
        }

        .direction_value {
          color: #4a4;
          font-weight: bold;
        }

        .someday .direction_value {
          color: #888;
        }

        .goddes_value {
          color: #f87;
        }

        .someday .goddes_value {
          color: #777;
        }

        .comment {
          margin-top: 50px;
          font-size: 11pt;
          margin-left: 10px;
        }

        .comment ul {
          margin-left: 0;
          padding-left: 20px;
          color: #999;
        }
      `}</style>
    </ConversionLayout>
  );
}
