import { useEffect, useState } from "react";

interface ValidationRule {
  message: string;
  validator: (value: string) => boolean;
}


interface ValidationProps {
  source: string;
  watch?: any[];
  rules: ValidationRule[];
}
const useValidation = ({ source, watch = [], rules }: ValidationProps) => {
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
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
