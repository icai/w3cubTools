import { useCallback, useEffect, useMemo, useState } from "react";

interface ValidationRule {
  message: string;
  validator: (value: string) => boolean;
}


interface ValidationProps {
  source: string;
  watch?: any[];
  rules: Array<ValidationRule>;
}
const useValidation = ({ source, watch = [], rules }: ValidationProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  useMemo(() => {
    const validation = rules.find(({ validator }) => !validator(source));
    if (validation) {
      setIsValid(false);
      setMessage(validation.message);
    } else {
      setIsValid(true);
      setMessage('');
    }
  }, [source, ...watch]);

  const attrs = {
    feedback: message,
    validationStatus: isValid ? 'success' : 'error',
  };

  return { isValid, message, attrs };
}
export default useValidation;
