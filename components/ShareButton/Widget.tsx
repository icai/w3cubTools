import { Icon, Pane } from "evergreen-ui";
import React, { useState } from "react";
import ShareButton from "@components/ShareButton";

export default function() {
  const [shareall, setShareAll] = useState(false);
  return (
    <div className={"share-widget " + (shareall ? "share-all" : "")}>
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
          <Icon icon="more" color="muted" />
        </Pane>
      )}
    </div>
  );
}
