import { useState } from "react";
import copy from "@utils/copy";
export default function useCopyClipboard(
  text: string
): [boolean, (v: boolean) => void] {
  const [isCopied, setIsCopied] = useState(false);

  return [
    isCopied,
    (setcopy = true) => {
      if (setcopy) {
        const didCopy = copy(text);
        setIsCopied(didCopy);
      } else {
        setIsCopied(setcopy);
      }
    }
  ];
}
