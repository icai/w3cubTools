import React from 'react';
import _ from 'lodash';
import { Table, Text, Pane } from 'evergreen-ui';
import SpanCopyable from '@/components/ui/SpanCopyable';

interface ResultRowProps {
  label: string;
  oldValue?: string;
  newValue?: string;
}

const ResultRow: React.FC<ResultRowProps> = ({ label, oldValue, newValue= '' }) => {
  const testId = _.kebabCase(label);

  return (
    <Table.Row>
      <Table.Cell fontWeight="bold">
        {label}
      </Table.Cell>
      <Table.Cell data-test-id={`${testId}.old`}>
        <Pane className="monospace">
          <Text>{oldValue}</Text>
        </Pane>
      </Table.Cell>
      <Table.Cell data-test-id={`${testId}.new`}>
        <SpanCopyable value={newValue} />
      </Table.Cell>
    </Table.Row>
  );
};

export default ResultRow;
