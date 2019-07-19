import React, { PureComponent, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import { categorizedRoutes, Route, routes } from "../utils/routes";

export default class Main extends PureComponent {
  render() {
    return (
      <div className="nav">
        <style jsx>{`
          .nav li {
            float: left;
            padding: 5px 10px;
            list-style: none;
          }
          .nav svg {
            width: 1em;
            height: 1em;
            vertical-align: middle;
          }
          .item {
            border: 1px solid #764abc;
            border-radius: 3px;
            color: #764abc;
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
        `}</style>
        {categorizedRoutes.map((route, i) => {
          return (
            <Fragment key={i + 1}>
              <h2>{route.category}:</h2>
              <ul className="clearfix ">
                {(route.content as Route[]).map((a: Route) => {
                  return (
                    <li key={a.path}>
                      <Link href={a.path} key={route.category + a.label}>
                        <a className="item">
                          {a.label}{" "}
                          {a.beta && <span className="beta">Beta</span>}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </div>
    );
  }
}
