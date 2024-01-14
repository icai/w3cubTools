import React from "react";
import Script from 'next/script'

interface ScriptsProps {
  scripts: Array<string>;
}

export default function Scripts({ scripts = [] }: ScriptsProps) {
  return (
    <React.Fragment>
      {scripts.map((item: string, ix) => {
        return <Script key={ix} src={item + "?v=" + process.env.HASHVERSION}></Script>;
      })}
    </React.Fragment>
  );
}
