import React, { useMemo } from 'react';
import { IconButton, Tooltip, DuplicateIcon, IconButtonOwnProps } from 'evergreen-ui';
import useClipboard from "@/hooks/useClipboard";

export type IconCopyableProps = IconButtonOwnProps & {
  value: string;
  [k: string]: any;
};

const IconCopyable: React.FC<IconCopyableProps> = ({ value, ...props }) => {

  const { hasCopied, onCopy } = useClipboard(value, { timeout: 2000 });
  const tooltipText = useMemo(() => (hasCopied ? 'Copied!' : 'Copy to clipboard'), [hasCopied]);
  return (
    <Tooltip content={tooltipText}>
      <IconButton icon={DuplicateIcon} onClick={() => {
        onCopy();
      }} {...props} />
    </Tooltip>
  );
};

export default IconCopyable;

