import React from "react";

/**
 * 按钮组件
 *
 * @export
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props
 * @returns
 */
export default function Button(props) {
  let { children, className, ...attrs } = props;
  return (
    <button {...attrs} type="button" className={className + " btn"}>
      {children}
    </button>
  );
}
