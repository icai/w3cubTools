import React, { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

/**
 * 行组件
 *
 * @export
 * @param {HTMLAttributes<HTMLDivElement>} props
 * @returns
 */
export default function Row(props: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  let { children, className, ...attrs } = props;
  className = classNames(className, "row");
  return (
    <div {...attrs} className={className}>
      {children}
    </div>
  );
}
