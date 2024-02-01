import _ from 'lodash';
import { convertBase } from '@/utils/utils';
import useValidation from '@/hooks/useValidation';


function ipv4ToInt({ ip }: { ip: string }) {
  if (!isValidIpv4({ ip })) {
    return 0;
  }

  return ip
    .trim()
    .split('.')
    .reduce((acc, part, index) => acc + Number(part) * 256 ** (3 - index), 0);
}

function ipv4ToIpv6({ ip, prefix = '0000:0000:0000:0000:0000:ffff:' }: { ip: string; prefix?: string }) {
  if (!isValidIpv4({ ip })) {
    return '';
  }

  return (
    prefix
    + _.chain(ip)
      .trim()
      .split('.')
      .map(part => Number.parseInt(part).toString(16).padStart(2, '0'))
      .chunk(2)
      .map(blocks => blocks.join(''))
      .join(':')
      .value()
  );
}

function isValidIpv4({ ip }: { ip: string }) {
  const cleanIp = ip.trim();

  return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(cleanIp);
}



function bits2ip(ipInt: number) {
  return `${ipInt >>> 24}.${(ipInt >> 16) & 255}.${(ipInt >> 8) & 255}.${ipInt & 255}`;
}

function getRangesize(start: string, end: string) {
  if (start == null || end == null) {
    return -1;
  }

  return 1 + Number.parseInt(end, 2) - Number.parseInt(start, 2);
}

function getCidr(start: string, end: string) {
  if (start == null || end == null) {
    return null;
  }

  const range = getRangesize(start, end);
  if (range < 1) {
    return null;
  }

  let mask = 32;
  for (let i = 0; i < 32; i++) {
    if (start[i] !== end[i]) {
      mask = i;
      break;
    }
  }

  const newStart = start.substring(0, mask) + '0'.repeat(32 - mask);
  const newEnd = end.substring(0, mask) + '1'.repeat(32 - mask);

  return { start: newStart, end: newEnd, mask };
}

export interface Ipv4RangeExpanderResult {
  oldSize?: number
  newStart?: string
  newEnd?: string
  newCidr?: string
  newSize?: number
}

function calculateCidr({ startIp, endIp }: { startIp: string; endIp: string }) {
  const start = convertBase({
    value: ipv4ToInt({ ip: startIp }).toString(),
    fromBase: 10,
    toBase: 2,
  }).padStart(32, '0');
  const end = convertBase({
    value: ipv4ToInt({ ip: endIp }).toString(),
    fromBase: 10,
    toBase: 2,
  }).padStart(32, '0');

  const cidr = getCidr(start, end);
  if (cidr != null) {
    const result: Ipv4RangeExpanderResult = {};
    result.newEnd = bits2ip(Number.parseInt(cidr.end, 2));
    result.newStart = bits2ip(Number.parseInt(cidr.start, 2));
    result.newCidr = `${result.newStart}/${cidr.mask}`;
    result.newSize = getRangesize(cidr.start, cidr.end);

    result.oldSize = getRangesize(start, end);
    return result;
  }

  return undefined;
}

const macAddressValidationRules = [
  {
    message: 'Invalid MAC address',
    validator: (value: string) => !!value.trim().match(/^([0-9A-Fa-f]{2}[:-]){2,5}([0-9A-Fa-f]{2})$/),
  },
];

function macAddressValidation(value: string) {
  return useValidation({
    source: value,
    rules: macAddressValidationRules,
  });
}

const partialMacAddressValidationRules = [
  {
    message: 'Invalid partial MAC address',
    validator: (value: string) => !!value.trim().match(/^([0-9a-f]{2}[:\-. ]){0,5}([0-9a-f]{0,2})$/i),
  },
];

function usePartialMacAddressValidation(value: string) {
  return useValidation({
    source: value,
    rules: partialMacAddressValidationRules,
  });
}



export {
  ipv4ToInt,
  ipv4ToIpv6,
  isValidIpv4,
  bits2ip,
  getRangesize,
  getCidr,
  calculateCidr,
  macAddressValidation,
  macAddressValidationRules,
  usePartialMacAddressValidation,
};
