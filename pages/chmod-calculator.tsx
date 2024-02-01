import React, { useState, useMemo } from 'react';
import { Table, TextInput, Group, Checkbox, Pane } from 'evergreen-ui';
import IconCopyable from '@/components/ui/IconCopyable';
import _ from 'lodash';

export type Scope = 'read' | 'write' | 'execute';
export type Group = 'owner' | 'group' | 'public';

export type GroupPermissions = {
  [k in Scope]: boolean;
};

export type Permissions = {
  [k in Group]: GroupPermissions;
};


function computeChmodOctalRepresentation({ permissions }: { permissions: Permissions }): string {
  const permissionValue = { read: 4, write: 2, execute: 1 };

  const getGroupPermissionValue = (permission: GroupPermissions) =>
    _.reduce(permission, (acc, isPermSet, key) => acc + (isPermSet ? _.get(permissionValue, key, 0) : 0), 0);

  return [
    getGroupPermissionValue(permissions.owner),
    getGroupPermissionValue(permissions.group),
    getGroupPermissionValue(permissions.public),
  ].join('');
}

function computeChmodSymbolicRepresentation({ permissions }: { permissions: Permissions }): string {
  const permissionValue = { read: 'r', write: 'w', execute: 'x' };

  const getGroupPermissionValue = (permission: GroupPermissions) =>
    _.reduce(permission, (acc, isPermSet, key) => acc + (isPermSet ? _.get(permissionValue, key, '') : '-'), '');

  return [
    getGroupPermissionValue(permissions.owner),
    getGroupPermissionValue(permissions.group),
    getGroupPermissionValue(permissions.public),
  ].join('');
}



const Scopes: { scope: Scope; title: string }[] = [
  { scope: 'read', title: 'Read (4)' },
  { scope: 'write', title: 'Write (2)' },
  { scope: 'execute', title: 'Execute (1)' },
];
const Groups: Group[] = ['owner', 'group', 'public'];

const ChmodCalculator: React.FC = () => {
  const [permissions, setPermissions] = useState({
    owner: { read: false, write: false, execute: false },
    group: { read: false, write: false, execute: false },
    public: { read: false, write: false, execute: false },
  });

  const octal = useMemo(() => computeChmodOctalRepresentation({ permissions }), [permissions]);
  const symbolic = useMemo(() => computeChmodSymbolicRepresentation({ permissions }), [permissions]);

  return (
    <Pane width="900px" margin="auto">
      <Table>
        <Table.Head>
          <Table.TextHeaderCell />
          {Groups.map((group) => (
            <Table.TextHeaderCell key={group} textAlign="center">
              {group.charAt(0).toUpperCase() + group.slice(1)} ({group.charAt(0)})
            </Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.Body>
          {Scopes.map(({ scope, title }) => (
            <Table.Row key={scope}>
              <Table.TextCell textAlign="center" className="line-header">{title}</Table.TextCell>
              {Groups.map((group) => (
                <Table.TextCell key={group} textAlign="center">
                  <Pane  display="flex" justifyContent="center" >
                    <Checkbox
                      checked={permissions[group][scope]}
                      onChange={(e) => {
                        setPermissions((prevPermissions) => ({
                          ...prevPermissions,
                          [group]: { ...prevPermissions[group], [scope]: e.target.checked },
                        }));
                      }}
                      size={20}
                    />
                  </Pane>
                </Table.TextCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pane className="octal-result"
        textAlign="center"
        fontSize={50}
        fontFamily="monospace"
        color="#18a058"
        marginY={20}
      >{octal}</Pane>
      <Pane textAlign="center"
        fontSize={50}
        fontFamily="monospace"
        color="#18a058"
        marginY={20}>{symbolic}</Pane>
      <Group flex="1 0 auto" width="100%">
        <TextInput height="50px" flex="max-content" value={`chmod ${octal} path`} readOnly />
        <IconCopyable height="50px" value={`chmod ${octal} path`} />
      </Group>
    </Pane>
  );
};

export default ChmodCalculator;
