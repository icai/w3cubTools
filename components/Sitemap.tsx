import React, { Fragment } from "react";
import { categorizedRoutes, Route } from "@utils/routes";
import Link from "next/link";


export default function Sitemap() {
  return (
    <div className="sitemap hidden-print">
      {categorizedRoutes.map((route: any, i) => {
        return (
          <Fragment key={i + 1}>
            <ul className="clearfix ">
              <li>
                <span>{route.category}:</span>
              </li>
              {route.content.map((a: any) => {
                return (
                  <li key={a.path}>
                    <Link className="item" key={route.category + a.label} href={a.path} prefetch={false}>
                      <span
                        className="item"
                      >
                        {a.label}{" "}
                        {a.beta && <span className="beta">Beta</span>}
                      </span>
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
