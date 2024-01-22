import { useState, useEffect, useCallback } from "react";
import copy from "@utils/copy";

export interface UseClipboardOptions {
  /**
   * timeout delay (in ms) to switch back to initial state once copied.
   */
  timeout?: number
  /**
   * Set the desired MIME type
   */
  format?: string
}
export default function useClipboard(
  value: string,
  optionsOrTimeout: number | UseClipboardOptions = {},
): {
  value: string
  setValue: (value: string) => void
  onCopy: (content?: string) => void
  hasCopied: boolean
  }  {
  const [hasCopied, setHasCopied] = useState(false)

  const [valueState, setValueState] = useState(value)
  useEffect(() => setValueState(value), [value])

  const { timeout = 1500, ...copyOptions } =
    typeof optionsOrTimeout === "number"
      ? { timeout: optionsOrTimeout }
      : optionsOrTimeout

  const onCopy = useCallback((content) => {
    // if has content, update value
    if (content) {
      setValueState(content)
    }
    const didCopy = copy(valueState, copyOptions)
    setHasCopied(didCopy)
  }, [valueState, copyOptions])

  useEffect(() => {
    let timeoutId: number | null = null

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [timeout, hasCopied])

  return {
    value: valueState,
    setValue: setValueState,
    onCopy,
    hasCopied,
  }
}
