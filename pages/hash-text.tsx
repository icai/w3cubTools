import { useState } from 'react';
import CryptoJS, { MD5, RIPEMD160, SHA1, SHA224, SHA256, SHA3, SHA384, SHA512, enc } from 'crypto-js';
import { useQueryParam } from "@hooks/useQueryParam";
import { Card, Textarea, SelectField, TextInput, Button, Group } from 'evergreen-ui';
import Divider from "@components/Divider";
import InputCopyable from '@/components/IconCopyable';

const algos = {
  MD5,
  SHA1,
  SHA256,
  SHA224,
  SHA512,
  SHA384,
  SHA3,
  RIPEMD160,
} as const;

type AlgoNames = keyof typeof algos;
type Encoding = keyof typeof enc | 'Bin';

const algoNames = Object.keys(algos) as AlgoNames[];


function convertHexToBin(hex: string) {
  return hex
    .trim()
    .split('')
    .map(byte => Number.parseInt(byte, 16).toString(2).padStart(4, '0'))
    .join('');
}


function formatWithEncoding(words: CryptoJS.lib.WordArray, encoding: Encoding) {
  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(enc.Hex));
  }

  return words.toString(enc[encoding]);
}

const HashGenerator: React.FC = () => {
  const [clearText, setClearText] = useState<string>('');
  const [queryValue, setQueryValue] = useQueryParam<Encoding>({ defaultValue: 'Hex', name: 'encoding' });

  const hashText = (algo: AlgoNames, value: string) => {
    // @ts-ignore
    return formatWithEncoding(algos[algo](value), queryValue);
  }
    
  return (
    <div>
      <Card width="720px" margin="auto">
        <Textarea
          value={clearText}
          onChange={(e) => setClearText(e.target.value)}
          placeholder="Your string to hash..."
          height={120}
          width="100%"
        />
        <Divider />      
        <SelectField
          // @ts-ignore
          value={queryValue}
          // @ts-ignore
          defaultValue={queryValue}
          // @ts-ignore
          onChange={(e) => setQueryValue(e.target.value as Encoding)}
          marginBottom={16}
          width="100%"
          label="Digest encoding"
        >
          <option value="Bin">Binary (base 2)</option>
          <option value="Hex">Hexadecimal (base 16)</option>
          <option value="Base64">Base64 (base 64)</option>
          <option value="Base64url">Base64url (base 64 with url safe chars)</option>
        </SelectField>

        {algoNames.map((algo) => (
          <div key={algo} style={{ margin: '5px 0' }}>
            <Group flex="1 0 auto" width="100%">
              <Button intent="none" flex="0 0 120px" display="flex" alignItems="center">
              {algo}
              </Button>
              <TextInput flex="max-content" value={hashText(algo, clearText)} readOnly />
              <InputCopyable value={hashText(algo, clearText)} />
            </Group>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default HashGenerator;
