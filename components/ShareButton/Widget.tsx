import { MoreIcon, Pane } from "evergreen-ui";

import React, { useState } from "react";
import ShareButton from "@components/ShareButton";

export default function ShareButtonWrap() {
  const [shareall, setShareAll] = useState(false);
  return (
    <div
      className={"share-widget hidden-print " + (shareall ? "share-all" : "")}
    >
      <ShareButton
        sites={[
          "facebook",
          "twitter",
          "weibo",
          "line",
          "gmail",
          "digg",
          "reddit",
          "linkedin",
          "douban",
          "qzone"
        ]}
      ></ShareButton>
      {!shareall && (
        <Pane
          padding={8}
          textAlign="center"
          cursor="pointer"
          onClick={() => {
            setShareAll(true);
          }}
        >
          <MoreIcon color="muted" />
        </Pane>
      )}
    </div>
  );
}
