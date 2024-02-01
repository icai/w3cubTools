import useClipboard from "@/hooks/useClipboard";
import { Tooltip } from "evergreen-ui";
import { useMemo } from "react";

const SpanCopyable: React.FC<{ value: string }> = ({ value }) => {
    const { hasCopied, onCopy } = useClipboard(value, { timeout: 1000 });
    const tooltipText = useMemo(() => (hasCopied ? 'Copied!' : 'Copy to clipboard'), [hasCopied]);
    return (
      <Tooltip content={tooltipText}>
        <span onClick={() => {
          onCopy();
        }}>{value}</span>
      </Tooltip>
    );
  };

export default SpanCopyable;
