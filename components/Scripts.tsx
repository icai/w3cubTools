import React from "react";

interface ScriptsProps {
  scripts: Array<string>;
}

export default function Scripts({ scripts = [] }: ScriptsProps) {
  return (
    <React.Fragment>
      {scripts.map((item: string, ix) => {
        return <script key={ix} src={item + "?v=" + process.env.HASHVERSION}></script>;
      })}
    </React.Fragment>
  );
}
