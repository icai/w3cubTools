import React, { Fragment } from "react";
import Link from "next/link";
import { categorizedRoutes, Route } from "@utils/routes";

export default function() {
  return (
    <Fragment>
      <div className="nav">
        {categorizedRoutes.map((route, i) => {
          return (
            <Fragment key={i + 1}>
              <h2>{route.category}:</h2>
              <ul className="clearfix ">
                {(route.content as Route[]).map((a: Route) => {
                  return (
                    <li key={a.path}>
                      <a
                        className="item"
                        href={a.path}
                        key={route.category + a.label}
                      >
                        {a.label} {a.beta && <span className="beta">Beta</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </div>
      <style jsx>{`
        .nav {
          li {
            float: left;
            padding: 5px 10px;
            list-style: none;
          }
          svg {
            width: 1em;
            height: 1em;
            vertical-align: middle;
          }
          .item {
            border: 1px solid #333;
            border-radius: 3px;
            color: #333;
            display: inline-block;
            line-height: 1.2em;
            text-decoration: none !important;
            transition: background 0.3s, color 0.3s;
            font-size: 30px;
            padding: 0.5em 1.25em;
            font-weight: 700;
          }

          .item:hover {
            background: #fff;
            color: #764abc;
          }

          .beta {
            background-color: #666;
            border-radius: 2px;
            margin-left: 10px;
            color: #fff;
            font-size: 12px;
            padding: 2px 6px;
            vertical-align: top;
          }
        }
      `}</style>
    </Fragment>
  );
}
