import Mdloader from "@components/Mdloader";
import entities from "@constants/entities.json";
import { SearchInput } from "evergreen-ui";
import { useState, useEffect, ChangeEvent } from "react";
import { createFuzzyList } from "@utils/fuzzyScore";


interface EntitiesItem {
  _cachedScore?: number;
  score: (query: string) => number;
  _i: number;
  [key: string]: any;
}


let lists: EntitiesItem[] = createFuzzyList(entities, ["category", "entities", "title", "block"]);

export default function HtmlEntities() {

  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<EntitiesItem[]>(lists);

  useEffect(() => {
    let sorted: EntitiesItem[] = [];
    if (query) {
      sorted = lists
        .filter((item) => {
          return (item._cachedScore = item.score(query)) >= 0.5;
        })
        .sort((a, b) => {
          var as = a._cachedScore as number;
          var bs = b._cachedScore as number;
          return as > bs ? -1 : as === bs && a._i < b._i ? -1 : 1;
        })
        .slice(0, 20);
    } else {
      sorted = lists;
    }
    setData(sorted);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <SearchInput
        placeholder="Typing something"
        onChange={handleInputChange}
        value={query}
        width={"600px"}
        margin={"auto"}
        marginY="100px"
        marginBottom="150px"
        display="block"
        height={80}
      />
      <table className="entitles">
        <tbody>
          {data.map((item, ix) => {
            return (
              <tr
                key={ix}
                title={item.title}
                data-block={item.block}
                data-category={item.category}
                data-set={item.set}
              >
                <td
                  className="character"
                  dangerouslySetInnerHTML={{ __html: "&" + item.dec + ";" }}
                ></td>
                <td className="named">
                  <code>
                    {item.entities.map(it => "&" + it + ";").join(" ")}
                  </code>
                </td>
                <td className="hex">
                  <code>&amp;{item.hex};</code>
                </td>
                <td className="dec">
                  <code>&amp;{item.dec};</code>
                </td>
              </tr>
            );
          })}
          {!data.length && (
            <tr className="empty">
              <td colSpan={4} style={{ fontSize: "30px", padding: "100px" }}>
                No Results
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Mdloader />
      <style jsx global>{`
        table.entitles {
          font: 0.8em Monaco;
          display: block;
          text-align: center;
          tr {
            background: #eee;
            display: inline-block;
            text-align: center;
            width: 9.5em;
            height: 9.5em;
            margin: 0.5em;
            padding: 1px;
            position: relative;
          }
          .empty {
            width: 100%;
            height: 100%;
          }
          td {
            display: block;
          }
          .character {
            font: 4em "Georgia", "Apple Symbols", serif;
            line-height: 1.1;
          }
          .hex,
          .dec {
            visibility: hidden;
          }
          .desc {
            display: none;
            position: absolute;
            text-align: center;
            background: silver;
            color: black;
          }
          tr:hover .character {
            font-size: 2em;
          }
          tr:hover .hex,
          tr:hover .dec {
            visibility: visible;
          }
          xtr:hover .desc {
            display: block;
            top: 100%;
            left: 0;
          }
        }
      `}</style>
    </>
  );
}
