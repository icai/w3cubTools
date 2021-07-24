import React from "react";

interface LinksProps {
  links: Array<string>;
}

export default function Links({ links = [] }: LinksProps) {
  return (
    <React.Fragment>
      {links.map((item: string, ix) => {
        return (
          <link
            rel="stylesheet"
            key={ix}
            href={item + "?v=" + __HASHVERSION__}
          />
        );
      })}
    </React.Fragment>
  );
}
