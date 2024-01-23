import { useEffect, useRef, useState, HTMLAttributes } from "react";
import { Tooltip, Pane } from "evergreen-ui";


interface EllipsisProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  maxCharacters: number;
  tooltip?: boolean;
}

const Ellipsis = ({
  children: originalContent,
  className,
  maxCharacters,
  tooltip = false,
}: EllipsisProps): JSX.Element => {
  const renderedContent =
    originalContent.length > maxCharacters
      ? `${originalContent.slice(0, maxCharacters)}...`
      : originalContent;

  if (tooltip && originalContent !== renderedContent) {
    return (
      <Tooltip content={originalContent}>
        <span aria-label={originalContent} className={className}>
          {renderedContent}
        </span>
      </Tooltip>
    );
  }

  return (
    <span aria-label={originalContent} className={className}>
      {renderedContent}
    </span>
  );
};

export default Ellipsis;
