import { useState, useEffect, useMemo } from 'react';
import { Netmask } from 'netmask';
import { useLocalStorage } from "@hooks/useLocalStorage";
import { withDefaultOnError, isNotThrowing } from '@/utils/utils';
import { Table, Pane, Text, Button, ArrowLeftIcon, ArrowRightIcon, TextInput, Tooltip } from 'evergreen-ui';
import useClipboard from "@/hooks/useClipboard";

function getIPClass({ ip }: { ip: string }) {
    const [firstOctet] = ip.split('.').map(Number);
  
    if (firstOctet < 128) {
      return 'A';
    }
    if (firstOctet > 127 && firstOctet < 192) {
      return 'B';
    }
    if (firstOctet > 191 && firstOctet < 224) {
      return 'C';
    }
    if (firstOctet > 223 && firstOctet < 240) {
      return 'D';
    }
    if (firstOctet > 239 && firstOctet < 256) {
      return 'E';
    }
  
    return undefined;
  }
  

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

const IPv4SubnetCalculator: React.FC = () => {
    // @ts-ignore
  const [ip, setIp] = useLocalStorage('ipv4-subnet-calculator:ip', '192.168.0.1/24');
  const [networkInfo, setNetworkInfo] = useState<Netmask | undefined>(undefined);

  useEffect(() => {
    const getNetworkInfo = (address: string) => withDefaultOnError(() => new Netmask(address.trim()), undefined);
    setNetworkInfo(getNetworkInfo(ip));
  }, [ip]);

  const ipValidationRules = [
    {
      message: 'We cannot parse this address, check the format',
      validator: (value: string) => isNotThrowing(() => new Netmask(value.trim())),
    },
  ];

  const sections: {
    label: string
    getValue: (blocks: Netmask) => string | undefined
    undefinedFallback?: string
  }[] = [
    {
      label: 'Netmask',
      getValue: block => block.toString(),
    },
    {
      label: 'Network address',
      getValue: ({ base }) => base,
    },
    {
      label: 'Network mask',
      getValue: ({ mask }) => mask,
    },
    {
      label: 'Network mask in binary',
      getValue: ({ bitmask }) => ('1'.repeat(bitmask) + '0'.repeat(32 - bitmask)).match(/.{8}/g)?.join('.') ?? '',
    },
    {
      label: 'CIDR notation',
      getValue: ({ bitmask }) => `/${bitmask}`,
    },
    {
      label: 'Wildcard mask',
      getValue: ({ hostmask }) => hostmask,
    },
    {
      label: 'Network size',
      getValue: ({ size }) => String(size),
    },
    {
      label: 'First address',
      getValue: ({ first }) => first,
    },
    {
      label: 'Last address',
      getValue: ({ last }) => last,
    },
    {
      label: 'Broadcast address',
      getValue: ({ broadcast }) => broadcast,
      undefinedFallback: 'No broadcast address with this mask',
    },
    {
      label: 'IP class',
      getValue: ({ base: ip }) => getIPClass({ ip }),
      undefinedFallback: 'Unknown class type',
    },
  ];

  const switchToBlock = ({ count = 1 }: { count?: number }) => {
    const next = networkInfo?.next(count);
    if (next) {
      setIp(next.toString());
    }
  };

  return (
    <Pane width="720px" margin="auto">
      <Pane marginBottom={10}>
        <Pane>Enter an IPv4 address with a subnet mask</Pane>
        <TextInput marginTop={10} width={'100%'} height="50px" value={ip} onChange={(e) => setIp(e.target.value)}  />
      </Pane>

      {networkInfo && (
        <Pane>
          <Table>
            <Table.Body>
              {sections.map(({ getValue, label, undefinedFallback }) => (
                <Table.Row key={label}>
                  <Table.Cell flexBasis="20%">
                    <strong>{label}</strong>
                  </Table.Cell>
                  <Table.Cell>
                    {getValue(networkInfo) ? (
                      // Using SpanCopyable component
                      <SpanCopyable value={getValue(networkInfo) || ''} />
                    ) : (
                      <Text opacity={0.7}>{undefinedFallback}</Text>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Pane marginTop={3} display="flex" alignItems="center" justifyContent="space-between">
            <Button onClick={() => switchToBlock({ count: -1 })}>
              <ArrowLeftIcon /> Previous block
            </Button>
            <Button onClick={() => switchToBlock({ count: 1 })}>
              Next block <ArrowRightIcon />
            </Button>
          </Pane>
        </Pane>
      )}
    </Pane>
  );
};

export default IPv4SubnetCalculator;
