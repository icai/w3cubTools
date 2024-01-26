import React, { createContext, useContext, useMemo } from 'react';
import { Pane } from 'evergreen-ui';

export interface RowContextState {
  gutter?: [number, number];
  // wrap?: boolean;
}

export const RowContext = createContext<RowContextState>({});

const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const;


const RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
] as const;

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;
export type GutterType = Gutter | [Gutter, Gutter];


export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: GutterType;
  align?: (typeof RowAligns)[number];
  justify?: (typeof RowJustify)[number];
  // prefixCls?: string;
  // wrap?: boolean;
}


// Hypothetical Col component
export const Col = ({ children, span }) => {
  const { gutter } = useContext(RowContext);
  let panePadding = 0;
  if (gutter) {
    panePadding = gutter[0] / 2;
  }

  return (
    <Pane
      flex={`0 0 ${(span / 24) * 100}%`}
      boxSizing="border-box"
      paddingLeft={panePadding}
      paddingRight={panePadding}
    >
      {children}
    </Pane>
  );
};


// Hypothetical Row component
export const Row = ({ children, ...props }) => {
  const { gutter, justify, align } = props as RowProps;
  let gutterH = 0;
  let gutterV = 0;
  if (Array.isArray(gutter)) {
    [gutterH, gutterV] = gutter as [number, number];
  } else {
    gutterH = gutter as number;
    gutterV = gutter as number;
  }
  const rowContext = useMemo<RowContextState>(
    () => ({ gutter: [gutterH, gutterV] as [number, number] }),
    [gutterH, gutterV],
  );
  return (
    <RowContext.Provider value={rowContext}>
      <Pane
        display="flex"
        flexWrap="wrap"
        position="relative"
        boxSizing="border-box"
        // @ts-ignore
        justifyContent={justify}
        // @ts-ignore
        alignItems={align}
        marginLeft={gutterH / -2}
        marginRight={gutterH / -2}
      >{children}</Pane>
    </RowContext.Provider>)
}
