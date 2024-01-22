import React, { useMemo } from 'react';
import { TextInput, IconButton, Tooltip, DuplicateIcon } from 'evergreen-ui';
import useClipboard from "@/hooks/useClipboard";

interface InputCopyableProps {
  value: string;
}

const InputCopyable: React.FC<InputCopyableProps> = ({ value }) => {

  const { hasCopied, onCopy } = useClipboard(value, { timeout: 2000 });
  const tooltipText = useMemo(() => (hasCopied ? 'Copied!' : 'Copy to clipboard'), [hasCopied]);
  return (
    <Tooltip content={tooltipText}>
      <IconButton icon={DuplicateIcon} onClick={() => {
        onCopy();
      }} />
    </Tooltip>
  );
};

export default InputCopyable;

