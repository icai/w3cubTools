import React, { useState, useEffect } from 'react';
import { Card, Alert, TextInput, Pane, PaneProps } from 'evergreen-ui';
import Divider from '@/components/ui/Divider';
import IconCopyable from '@/components/IconCopyable';
import FormField from '@/components/ui/FormField';
import _ from 'lodash';

function getErrorMessageIfThrows(cb: () => unknown) {
  try {
    cb();
    return undefined;
  }
  catch (err) {
    if (_.isString(err)) {
      return err;
    }

    if (_.isError(err)) {
      return err.message;
    }

    if (_.isObject(err) && _.has(err, 'message')) {
      return (err as { message: string }).message;
    }

    return 'An error as occurred.';
  }
}


export function convertBase({ value, fromBase, toBase }: { value: string; fromBase: number; toBase: number }) {
  const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
  const fromRange = range.slice(0, fromBase);
  const toRange = range.slice(0, toBase);
  let decValue = value
    .split('')
    .reverse()
    .reduce((carry: number, digit: string, index: number) => {
      if (!fromRange.includes(digit)) {
        throw new Error(`Invalid digit "${digit}" for base ${fromBase}.`);
      }
      return (carry += fromRange.indexOf(digit) * fromBase ** index);
    }, 0);
  let newValue = '';
  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue;
    decValue = (decValue - (decValue % toBase)) / toBase;
  }
  return newValue || '0';
}


interface InputCopyableProps extends PaneProps {
  label?: string;
  value: string;
  placeholder: string;
}

const InputCopyable: React.FC<InputCopyableProps> = ({ label, value, placeholder, ...props}) => {
  return (
    // @ts-ignore
    <FormField label={label} labelPlacement="left" labelWidth={160} marginBottom={8} {...props}>
      <TextInput
        placeholder={placeholder}
        value={value}
        flex="max-content"
        readOnly
        marginBottom={2}
      />
      <IconCopyable value={value} />
    </FormField>
  );
};

const IntegerBaseConverter: React.FC = () => {
  const [input, setInput] = useState('42');
  const [inputBase, setInputBase] = useState<number>(10);
  const [outputBase, setOutputBase] = useState<number>(42);
  const [error, setError] = useState<string | null>(null);

  const bases = [
    { base: 2, label: 'Binary (2)' },
    { base: 10, label: 'Decimal (10)' },
    { base: 8, label: 'Octal (8)' },
    { base: 16, label: 'Hexadecimal (16)' },
    { base: 64, label: 'Base64 (64)' },
  ]
  const errorlessConvert = (...args: Parameters<typeof convertBase>) => {
    try {
      return convertBase(...args);
    } catch (err) {
      return '';
    }
  };

  useEffect(() => {
    // @ts-ignore
    setError(getErrorMessageIfThrows(() =>
      convertBase({ value: input, fromBase: inputBase, toBase: outputBase })
    )
    );
  }, [input, inputBase, outputBase]);

  return (
    <Pane width="720px" margin="auto">
      <Card>
        <FormField label="Input number" labelPlacement="left" labelWidth={110} marginBottom={8} >
          <TextInput
            placeholder="Put your number here (ex: 42)"
            value={input}
            width="100%"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          />
        </FormField>
        <FormField label="Input base" labelPlacement="left" labelWidth={110} marginBottom={8} >
          <TextInput
            type="number"
            value={inputBase.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputBase(Number(e.target.value))}
            min={2}
            max={64}
            placeholder="Put your input base here (ex: 10)"
            width="100%"
          />
        </FormField>

        {error && (
          <>
            <Alert marginTop={25} intent="danger">
              {error}
            </Alert>
          </>
        )}
        <Divider />
        {bases.map((base, i) => (
          <InputCopyable
            key={i}
            label={base.label}
            value={errorlessConvert({ value: input, fromBase: inputBase, toBase: base.base })}
            placeholder={`${base.label} version will be here...`}
          />
        ))}
        <Pane display="flex" alignItems="baseline">
          <Pane width={160} marginRight={8}>
            <FormField label="Custom:" labelWidth={'60px'} marginBottom={0}>
              <TextInput
                type="number"
                value={outputBase.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputBase(Number(e.target.value))}
                min={2}
                max={64}
                width="100%"
              />
            </FormField>
          </Pane>
          <InputCopyable
            value={errorlessConvert({ value: input, fromBase: inputBase, toBase: outputBase })}
            placeholder={`Base ${outputBase} will be here...`}
            flex="max-content"
          />
        </Pane>
      </Card>
    </Pane>
  );
};

export default IntegerBaseConverter;
