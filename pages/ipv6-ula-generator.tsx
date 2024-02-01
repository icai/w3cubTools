import { useState, useEffect } from 'react';
import { SHA1 } from 'crypto-js';
import { TextInputField, Alert, Pane, Text, TextInput, Group, Label } from 'evergreen-ui';
import { macAddressValidationRules } from '@/utils/ip';
import IconCopyable from '@/components/ui/IconCopyable';
import FormField from '@/components/ui/FormField';
import useValidation from '@/hooks/useValidation';

const IPv6UlaGenerator: React.FC = () => {
  const [macAddress, setMacAddress] = useState<string>('20:37:06:12:34:56');
  const macAddressValid = useValidation({
    source: macAddress,
    rules: macAddressValidationRules,
  });
  const [addressValidation, setAddressValidation] = useState<any>(macAddressValid);
  const [calculatedSections, setCalculatedSections] = useState<any[]>([]);

  useEffect(() => {
    const timestamp = new Date().getTime();
    const hex40bit = SHA1(timestamp + macAddress).toString().substring(30);

    const ula = `fd${hex40bit.substring(0, 2)}:${hex40bit.substring(2, 6)}:${hex40bit.substring(6)}`;

    const sections = [
      {
        label: 'IPv6 ULA:',
        value: `${ula}::/48`,
      },
      {
        label: 'First routable block:',
        value: `${ula}:0::/64`,
      },
      {
        label: 'Last routable block:',
        value: `${ula}:ffff::/64`,
      },
    ];

    setCalculatedSections(sections);
  }, [macAddress]);



  const handleMacAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMacAddress = e.target.value;
    setMacAddress(newMacAddress);
    setAddressValidation(macAddressValid);
  };

  return (
    <Pane width="720px" margin="auto">
      <Alert
        intent="info"
        title="Info"
      >
        This tool uses the first method suggested by IETF using the current timestamp plus the mac address, sha1 hashed,
        and the lower 40 bits to generate your random ULA.
      </Alert>

      <TextInputField
        label="MAC address:"
        placeholder="Type a MAC address"
        value={macAddress}
        onChange={handleMacAddressChange}
        marginTop={8}
      />

      {addressValidation.isValid && (
        <Pane marginTop={16}>
          {calculatedSections.map(({ label, value }) => (
            <Pane key={label} marginBottom={8}>
              <FormField label={label} labelWidth={160}>
                <Group flex="1 0 auto" width="100%">
                  <TextInput flex="max-content" value={value} readOnly />
                  <IconCopyable value={value} />
                </Group>
              </FormField>
            </Pane>
          ))}
        </Pane>
      )}
    </Pane>
  );
};

export default IPv6UlaGenerator;
