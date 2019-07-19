import React, { Fragment } from "react";
import Link from "next/link";
import { categorizedRoutes, Route } from "@utils/routes";
import "@styles/index.less";

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
    </Fragment>
  );
}
