import mimes from "@constants/mime.json";
import Mdloader from "@components/Mdloader";
// @ts-ignore
import { SearchInput, Pane, toaster } from "evergreen-ui";
import { useState, useEffect } from "react";
import { createFuzzyList } from "@utils/fuzzyScore";
import copy from "@utils/copy";
let lists = createFuzzyList(mimes)
export default function MimeList() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(lists);
  useEffect(() => {
    let sorted = [];
    if (query) {
      sorted = lists
        .filter(function(item) {
          return (item._cachedScore = item.score(query)) >= 0.5;
        })
        .sort(function(a, b) {
          var as = a._cachedScore;
          var bs = b._cachedScore;
          return as > bs ? -1 : as == bs && a.i < b.i ? -1 : 1;
        })
        .slice(0, 20);
    } else {
      sorted = lists;
    }
    setData(sorted);
  }, [query]);
  var copyCode = function(item) {
    const isCopied = copy("." + item[0] + " " + item[1]);
    if (isCopied) {
      toaster.success("Code Copied! 👍", {
        duration: 2
      });
    }
  };
  return (
    <Pane margin="auto" width="800px">
      <SearchInput
        placeholder="Typing something"
        onChange={e => {
          setQuery(e.target.value);
        }}
        value={query}
        width={"600px"}
        margin={"auto"}
        marginY="100px"
        marginBottom="150px"
        display="block"
        height={80}
      />
      <table className="mimes">
        <tbody>
          <tr>
            <th className="separateColor" style={{ width: "30%" }}>
              Extension
            </th>
            <th>Content-Type(Mime-Type)</th>
          </tr>
          {data.map((item, ix) => {
            return (
              <tr
                key={ix}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  copyCode(item);
                }}
              >
                <td>{item[0]}</td>
                <td>
                  <code>{item[1]}</code>
                </td>
              </tr>
            );
          })}
          {!data.length && (
            <tr>
              <td colSpan={2} style={{ fontSize: "30px", padding: "100px" }}>
                No Results
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <style jsx>{`
        .mimes {
          font: 1em Monaco;
          text-align: center;
          border: 1px solid #ccc;
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
        }
        .mimes tr > th,
        .mimes tr > td {
          border: 1px solid #ddd;
          padding: 8px;
          line-height: 1.428571429;
          vertical-align: top;
          border-top: 1px solid #ddd;
        }
        .mimes tr > th {
          border-bottom-width: 2px;
          padding: 12px 8px;
        }

        .mimes tr:nth-of-type(odd) {
          background-color: #f9f9f9;
        }

        .mimes tr:hover td {
          background-color: #f5f5f5;
        }
      `}</style>
    </Pane>
  );
}
