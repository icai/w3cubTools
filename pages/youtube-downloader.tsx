import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect
} from "react";
import { Pane } from "evergreen-ui";
import WriteCharactorSearch from "@components/WriteCharactor/WriteCharactorSearch";
export default function() {
  const [char, setChar] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [thumbnail, setThumbnail] = useState({} as any);
  const [res, setRes] = useState({} as any);
  const onSearch = async slug => {
    const fetchingUrl = `https://ytinfo.benjaminlowry.com/${slug}`;
    const res = await fetch(fetchingUrl);
    const value = (await res.json()) as any;
    setChar(slug);
    if (value && value.formats) {
      setRes(value);
      setThumbnail(value.player_response.videoDetails.thumbnail.thumbnails[2]);
      setTitle(value.player_response.videoDetails.title);
      setContent(value.formats.filter(item => item.container == "mp4") as Array<
        object
      >);
    }
  };

  const formatUrl = (url, title) => {
    url = url.replace(
      /\/[^\/]+\.googlevideo\.com/,
      "/redirector.googlevideo.com"
    );
    url = url + `&title=${title}`;
    return url;
  };

  useEffect(() => {}, [char]);

  return (
    <Pane width="800px" minHeight="400px" height="100%" margin="auto">
      <div style={{ marginTop: "100px" }}>
        <WriteCharactorSearch
          char={char}
          style={{ borderRadius: "50px" }}
          height={60}
          fontSize={"30px"}
          onSearch={onSearch}
          placeholder="Paste the link eg. https://www.youtube.com/watch?v=vl08L2oUvfI"
        ></WriteCharactorSearch>
      </div>
      <div>
        {char && thumbnail.url && (
          <Pane
            className="media"
            display="flex"
            style={{
              border: "1px solid #ededed",
              marginTop: "20px",
              padding: "20px"
            }}
          >
            <Pane display="flex">
              <img
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                alt=""
              />
            </Pane>
            <Pane display="flex" flexDirection="column" marginLeft="15px">
              {char && res.player_response && (
                <h3 style={{ textAlign: "left" }}>
                  {res.player_response.videoDetails.title}
                </h3>
              )}
              {char && res.player_response && (
                <p style={{ color: "#606060" }}>
                  {res.player_response.videoDetails.author}
                </p>
              )}
            </Pane>
          </Pane>
        )}
        {char && (
          <table className="ytable">
            <tbody>
              <tr>
                <th className="separateColor" style={{ width: "30%" }}>
                  Extension
                </th>
                <th>Resolution</th>
                <th>Download</th>
              </tr>
              {content.map((item, ix) => {
                return (
                  <tr key={ix} style={{ cursor: "pointer" }}>
                    <td>{item.container}</td>
                    <td>{item.resolution}</td>
                    <td>
                      <a
                        href={formatUrl(item.url, title)}
                        target="_blank"
                        style={{ position: "relative" }}
                      >
                        download
                        {ix == 0 && (
                          <sup style={{ position: "absolute", color: "red" }}>
                            hot
                          </sup>
                        )}
                      </a>
                    </td>
                  </tr>
                );
              })}
              {!content.length && (
                <tr>
                  <td
                    colSpan={3}
                    style={{ fontSize: "30px", padding: "100px" }}
                  >
                    No Results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <style jsx>{`
        .ytable {
          font: 1em Monaco;
          text-align: center;
          border: 1px solid #ccc;
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
        }
        .ytable tr > th,
        .ytable tr > td {
          border: 1px solid #ddd;
          padding: 8px;
          line-height: 1.428571429;
          vertical-align: top;
          border-top: 1px solid #ddd;
        }
        .ytable tr > th {
          border-bottom-width: 2px;
          padding: 12px 8px;
        }

        .ytable tr:nth-of-type(odd) {
          background-color: #f9f9f9;
        }

        .ytable tr:hover td {
          background-color: #f5f5f5;
        }
      `}</style>
    </Pane>
  );
}
