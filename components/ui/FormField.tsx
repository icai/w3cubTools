import React, { ReactNode } from 'react';
import { Pane, Label, PaneProps } from 'evergreen-ui';

interface CustomFormFieldProps extends PaneProps {
  label?: ReactNode;
  labelWidth?: number | string;
  children?: ReactNode;
  labelPlacement?: 'left' | 'top';
  marginBottom?: number;
}

const FormField: React.FC<CustomFormFieldProps> = ({
  label,
  labelWidth = 110,
  children,
  labelPlacement = 'left',
  marginBottom = 8,
  ...props
}) => {
  return (
    <Pane marginBottom={marginBottom} display="flex" flexDirection={labelPlacement === 'top' ? 'column' : 'row'} alignItems="center" {...props}>
      {labelPlacement === 'left' && (
        (label && <Label flexShrink={0} marginRight={8} width={labelWidth}>
          {label}
        </Label>)
      )}
      <Pane flex="1" display="flex">
        {labelPlacement === 'top' && (
          (label && <Label marginBottom={8} display="block">
            {label}
          </Label>)
        )}
        {children}
      </Pane>
    </Pane>
  );
};

export default FormField;
