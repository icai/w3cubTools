import React, { useState, useEffect, useCallback } from 'react';
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import { Card, TextInput, Group, Button } from 'evergreen-ui';
import Divider from '@/components/ui/Divider';
import IconCopyable from '@/components/IconCopyable';

const BaseConfig = {
  split: (input: String) => input.trim().split(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/gi)
};

const titleCase = (input: string, config: typeof BaseConfig) => {
  const words = config.split(input);
  const output = words
    .map((word: string) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return `${firstLetter}${rest}`;
    })
    .join(' ');

  return output;
}
const paramCase = (input: string, config: typeof BaseConfig) => {
  const words = config.split(input);
  const output = words
    .map((word: string) => {
      const firstLetter = word.charAt(0).toLowerCase();
      const rest = word.slice(1).toLowerCase();
      return `${firstLetter}${rest}`;
    })
    .join('-');

  return output;
}

const Mockingcase = (input: string) =>
  input
    .split('')
    .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
    .join('');

const IconCopyableList = ({ formats }: { formats: { label: string; value: string }[] }) => (
  <>
    {formats.map((format) => (
      <div key={format.label} style={{ margin: '10px 0' }}>
        <Group flex="1 0 auto" width="100%">
          <Button intent="none" flex="0 0 120px" display="flex" alignItems="center">
            {format.label}
          </Button>
          <TextInput flex="max-content" placeholder='Input text' value={format.value} readOnly />
          <IconCopyable key={format.label} value={format.value} />
        </Group>
      </div>
    ))}
  </>
);

const CaseConverter = () => {
  const [input, setConvertInput] = useState<string>('');
  const [boxInput, setTextboxInput] = useState<string>('lorem ipsum dolor sit amet');
  // add input to filter calback
  const setInput = useCallback((input: string) => {
    setTextboxInput(input);
    // remove special characters
    input = input.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/gi, ' ');
    setConvertInput(input);
  }, []);
  
  // input not null undefined
  const formats = [
    {
      label: 'Lowercase:',
      value: (input || '').toLowerCase(),
    },
    {
      label: 'Uppercase:',
      value: (input || '').toUpperCase(),
    },
    {
      label: 'Camelcase:',
      value: input ? camelCase(input, BaseConfig) : '',
    },
    {
      label: 'Capitalcase:',
      value: input ? capitalCase(input, BaseConfig) : '',
    },
    {
      label: 'Constantcase:',
      value: constantCase(input, BaseConfig),
    },
    {
      label: 'Dotcase:',
      value: dotCase(input, BaseConfig),
    },
    {
      label: 'Titlecase:',
      value: titleCase(input, BaseConfig),
    },
    {
      label: 'Nocase:',
      value: noCase(input, BaseConfig),
    },
    {
      label: 'Paramcase:',
      value: paramCase(input, BaseConfig),
    },
    {
      label: 'Pascalcase:',
      value: input ? pascalCase(input, BaseConfig) : '',
    },
    {
      label: 'Pathcase:',
      value: pathCase(input, BaseConfig),
    },
    {
      label: 'Sentencecase:',
      value: input ? sentenceCase(input, BaseConfig) : '',
    },
    {
      label: 'Snakecase:',
      value: snakeCase(input, BaseConfig),
    },
    {
      label: 'Mockingcase:',
      value: Mockingcase(input),
    },
  ];

  const inputLabelAlignmentConfig = {

  };


  useEffect(() => {
    setInput(boxInput);
  }, []);

  return (
    <Card width="720px" margin="auto">
      <TextInput
        value={boxInput}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your string..."
        width="100%"
        height={60}
        fontSize={40}
        marginBottom={16}
        {...inputLabelAlignmentConfig}
      />
      <Divider />
      <IconCopyableList formats={formats} />
    </Card>
  );
};

export default CaseConverter;
