import React from "react";

interface ScriptsProps {
  scripts: Array<string>;
}

export default function({ scripts = [] }: ScriptsProps) {
  return (
    <>
      {scripts.map((item: string, ix) => {
        return <script key={ix} src={item + "?v=" + __HASHVERSION__}></script>;
      })}
    </>
  );
}
