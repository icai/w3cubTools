import React, { useState, useEffect } from 'react';
import { isValidIpv4, Ipv4RangeExpanderResult, calculateCidr } from '@/utils/ip';
import ResultRow from '@/components/ui/ResultRow';
import useValidation from '@/hooks/useValidation';
import { TextInputField, Table, Pane, Alert, Button, ExchangeIcon } from 'evergreen-ui';

const IPv4RangeExpander: React.FC = () => {
  const [rawStartAddress, setRawStartAddress] = useState<string>('192.168.1.1');
  const [rawEndAddress, setRawEndAddress] = useState<string>('192.168.6.255');
  const [result, setResult] = useState<Ipv4RangeExpanderResult | undefined>(undefined);

  const calculatedValues = [
    {
      label: 'Start address',
      getOldValue: () => rawStartAddress,
      getNewValue: (result: Ipv4RangeExpanderResult | undefined) => result?.newStart,
    },
    {
      label: 'End address',
      getOldValue: () => rawEndAddress,
      getNewValue: (result: Ipv4RangeExpanderResult | undefined) => result?.newEnd,
    },
    {
      label: 'Addresses in range',
      getOldValue: (result: Ipv4RangeExpanderResult | undefined) => result?.oldSize?.toLocaleString(),
      getNewValue: (result: Ipv4RangeExpanderResult | undefined) => result?.newSize?.toLocaleString(),
    },
    {
      label: 'CIDR',
      getOldValue: () => '',
      getNewValue: (result: Ipv4RangeExpanderResult | undefined) => result?.newCidr,
    },
  ];

  const startIpValidation = useValidation({
    source: rawStartAddress,
    rules: [{ message: 'Invalid ipv4 address', validator: ip => isValidIpv4({ ip }) }],
  });

  const endIpValidation = useValidation({
    source: rawEndAddress,
    rules: [{ message: 'Invalid ipv4 address', validator: ip => isValidIpv4({ ip }) }],
  });

  const showResult = endIpValidation.isValid && startIpValidation.isValid && result !== undefined;

  useEffect(() => {
    setResult(calculateCidr({ startIp: rawStartAddress, endIp: rawEndAddress }));
  }, [rawStartAddress, rawEndAddress]);

  const onSwitchStartEndClicked = () => {
    const tmpStart = rawStartAddress;
    setRawStartAddress(rawEndAddress);
    setRawEndAddress(tmpStart);
  };

  return (
    <Pane width="720px" margin="auto">
      <Pane marginBottom={4} display="flex" gap={4}>
        <TextInputField
          label="Start address"
          placeholder="Start IPv4 address..."
          value={rawStartAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawStartAddress(e.target.value)}
        />

        <TextInputField
          label="End address"
          placeholder="End IPv4 address..."
          value={rawEndAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawEndAddress(e.target.value)}
        />
      </Pane>

      {showResult ? (
        <Table>
          <Table.Head>
            <Table.TextHeaderCell></Table.TextHeaderCell>
            <Table.TextHeaderCell>old value</Table.TextHeaderCell>
            <Table.TextHeaderCell>new value</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {calculatedValues.map(({ label, getOldValue, getNewValue }) => (
              <ResultRow
                key={label}
                label={label}
                oldValue={getOldValue(result)}
                newValue={getNewValue(result)}
              />
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Alert
          intent="danger"
          title="Invalid combination of start and end IPv4 address"
        >
          <Pane marginY={3} opacity={0.7}>
            The end IPv4 address is lower than the start IPv4 address. This is not valid and no result could be
            calculated. In most cases, the solution to solve this problem is to change start and end addresses.
          </Pane>
          <Button onClick={onSwitchStartEndClicked}>
            <ExchangeIcon marginRight={2} size={22} />
            Switch start and end IPv4 address
          </Button>
        </Alert>
      )}
    </Pane>
  );
};

export default IPv4RangeExpander;
