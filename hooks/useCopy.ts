import { useState } from 'react';
import useClipboard from './useClipboard';
import { toaster } from 'evergreen-ui'; // Import Evergreen UI components
interface UseCopyProps {
  source?: string;
  text?: string;
  createToast?: boolean;
}

export function useCopy({ source, text = 'Copied to the clipboard', createToast = true }: UseCopyProps = {}) {
  const { onCopy, hasCopied, ...rest } = useClipboard(source || '', );
  const [isJustCopied, setIsJustCopied] = useState(false);

  return {
    isJustCopied: hasCopied || isJustCopied,
    copy(content?: string, { notificationMessage }: { notificationMessage?: string } = {}) {
      if (source) {
        onCopy();
      } else {
        onCopy(content);
      }
      if (createToast) {
        toaster.success(notificationMessage ?? text);
        setIsJustCopied(true);
        setTimeout(() => {
          setIsJustCopied(false);
        }, 2000);
      }
    },
  };
}
