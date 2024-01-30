import React, { useState, useEffect } from 'react';
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
  parseJSON,
} from 'date-fns';
import _ from 'lodash';
import { Pane, Group, Button, TextInput, Select } from 'evergreen-ui';
import Divider from '@/components/ui/Divider';
import IconCopyable from '@/components/IconCopyable';

const ISO8601_REGEX
  = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
const ISO9075_REGEX
  = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,6})?(([+-])([0-9]{2}):([0-9]{2})|Z)?$/;

const RFC3339_REGEX
  = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,9})?(([+-])([0-9]{2}):([0-9]{2})|Z)$/;

const RFC7231_REGEX = /^[A-Za-z]{3},\s[0-9]{2}\s[A-Za-z]{3}\s[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}\sGMT$/;

const EXCEL_FORMAT_REGEX = /^-?\d+(\.\d+)?$/;

function createRegexMatcher(regex: RegExp) {
  return (date?: string) => !_.isNil(date) && regex.test(date);
}

const isISO8601DateTimeString = createRegexMatcher(ISO8601_REGEX);
const isISO9075DateString = createRegexMatcher(ISO9075_REGEX);
const isRFC3339DateString = createRegexMatcher(RFC3339_REGEX);
const isRFC7231DateString = createRegexMatcher(RFC7231_REGEX);
const isUnixTimestamp = createRegexMatcher(/^[0-9]{1,10}$/);
const isTimestamp = createRegexMatcher(/^[0-9]{1,13}$/);
const isMongoObjectId = createRegexMatcher(/^[0-9a-fA-F]{24}$/);

const isExcelFormat = createRegexMatcher(EXCEL_FORMAT_REGEX);

function isUTCDateString(date?: string) {
  if (_.isNil(date)) {
    return false;
  }

  try {
    return new Date(date).toUTCString() === date;
  }
  catch (_ignored) {
    return false;
  }
}

function dateToExcelFormat(date: Date) {
  return String(((date.getTime()) / (1000 * 60 * 60 * 24)) + 25569);
}

function excelFormatToDate(excelFormat: string | number) {
  return new Date((Number(excelFormat) - 25569) * 86400 * 1000);
}

interface DateFormat {
  name: string;
  fromDate: (date: Date) => string;
  toDate: (date: string) => Date;
  formatMatcher: (date: string) => boolean;
}

interface ToDateMapper {
  (date: string): Date;
}

interface ValidationRule {
  message: string;
  validator: (value: string) => boolean;
}

interface ValidationProps {
  source: string;
  watch: any[];
  rules: ValidationRule[];
}

const toDate: ToDateMapper = date => new Date(date);


const withDefaultOnError = (callback: () => any, defaultValue: any) => {
  try {
    return callback();
  } catch (error) {
    return defaultValue;
  }
};

const useValidation = ({ source, watch, rules }: ValidationProps) => {
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

  return { isValid, message };
}


const DateConverter: React.FC = () => {
  const [inputDate, setInputDate] = useState('');
  const [formatIndex, setFormatIndex] = useState(6);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formats: DateFormat[] = [
    {
        name: 'JS locale date string',
        fromDate: date => date.toString(),
        toDate,
        formatMatcher: () => false,
      },
      {
        name: 'ISO 8601',
        fromDate: formatISO,
        toDate: parseISO,
        formatMatcher: date => isISO8601DateTimeString(date),
      },
      {
        name: 'ISO 9075',
        fromDate: formatISO9075,
        toDate: parseISO,
        formatMatcher: date => isISO9075DateString(date),
      },
      {
        name: 'RFC 3339',
        fromDate: formatRFC3339,
        toDate,
        formatMatcher: date => isRFC3339DateString(date),
      },
      {
        name: 'RFC 7231',
        fromDate: formatRFC7231,
        toDate,
        formatMatcher: date => isRFC7231DateString(date),
      },
      {
        name: 'Unix timestamp',
        fromDate: date => String(getUnixTime(date)),
        toDate: sec => fromUnixTime(+sec),
        formatMatcher: date => isUnixTimestamp(date),
      },
      {
        name: 'Timestamp',
        fromDate: date => String(getTime(new Date(date))),
        toDate: ms => parseJSON(new Date(+ms).toISOString()),
        formatMatcher: date => isTimestamp(date),
      },
      {
        name: 'UTC format',
        fromDate: date => date.toUTCString(),
        toDate,
        formatMatcher: date => isUTCDateString(date),
      },
      {
        name: 'Mongo ObjectID',
        fromDate: date => `${Math.floor(date.getTime() / 1000).toString(16)}0000000000000000`,
        toDate: objectId => new Date(Number.parseInt(objectId.substring(0, 8), 16) * 1000),
        formatMatcher: date => isMongoObjectId(date),
      },
      {
        name: 'Excel date/time',
        fromDate: date => dateToExcelFormat(date),
        toDate: excelFormatToDate,
        formatMatcher: isExcelFormat,
      },
  ];

  const normalizedDate = (() => {
    if (!inputDate) {
      return now;
    }

    const { toDate } = formats[formatIndex];

    try {
      return toDate(inputDate);
    } catch (_ignored) {
      return undefined;
    }
  })();

  const onDateInputChanged = (value: string) => {
    const matchingIndex = formats.findIndex(({ formatMatcher }) => formatMatcher(value));
    if (matchingIndex !== -1) {
      setFormatIndex(matchingIndex);
    }
  };

  const validation = useValidation({
    source: inputDate,
    watch: [formatIndex],
    rules: [
      {
        message: 'This date is invalid for this format',
        validator: (value) =>
          withDefaultOnError(() => {
            if (value === '') {
              return true;
            }
            const maybeDate = formats[formatIndex].toDate(value);
            return isDate(maybeDate) && isValid(maybeDate);
          }, false),
      },
    ],
  });

  const formatDateUsingFormatter = (formatter: (date: Date) => string, date?: Date) => {

    if (!date || !validation.isValid) {
      console.log('formatDateUsingFormatter', date, validation.isValid);
      return '';
    }
    return withDefaultOnError(() => formatter(date), '');
  };

  useEffect(() => {
    onDateInputChanged(inputDate);
  }, [inputDate]);

  return (
    <Pane width="720px" margin="auto">
      <Pane display="flex" gap="2px">
        <TextInput
          width="70%"
          height="50px"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          autoFocus
          placeholder="Put your date string here..."
          data-testid="date-time-converter-input"
        />
        <Select
          value={formatIndex}
          onChange={(e) => setFormatIndex(parseInt(e.target.value, 10))}
          width="100px"
          height="50px"
          data-testid="date-time-converter-format-select"
        >
            {formats.map(({ name }, i) => (
                <option key={name} value={i}>
                {name}
                </option>
            ))}
        </Select>
      </Pane>
      <Divider />
      {formats.map(({ name, fromDate }) => (
        <Pane key={name} marginY="8px"  >
          <Group flex="1 0 auto" width="100%">
            <Button intent="none" flex="0 0 160px" display="flex" alignItems="center">
            {name}
            </Button>
            <TextInput flex="max-content" value={formatDateUsingFormatter(fromDate, normalizedDate)} readOnly />
            <IconCopyable value={formatDateUsingFormatter(fromDate, normalizedDate)} />
          </Group>
        </Pane>
      ))}
    </Pane>
  );
};

export default DateConverter;
