import React from "react";

interface LinksProps {
  links: Array<string>;
}

export default function({ links = [] }: LinksProps) {
  return (
    <>
      {links.map((item: string, ix) => {
        return (
          <link
            rel="stylesheet"
            key={ix}
            href={item + "?v=" + __HASHVERSION__}
          />
        );
      })}
    </>
  );
}
