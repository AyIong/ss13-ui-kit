import type { BoxProps } from '../Box/types';

export type TableProps = Partial<{
  /** Collapses table to the smallest possible size. */
  collapsing: boolean;
}> &
  BoxProps<HTMLTableElement>;

export type RowProps = Partial<{
  /** Whether this is a header cell. */
  header: boolean;
}> &
  BoxProps<HTMLTableRowElement>;

export type CellProps = Partial<{
  /** Additional columns for this cell to expand, assuming there is room. */
  colSpan: number;
  /** Collapses table cell to the smallest possible size,
    and stops any text inside from wrapping. */
  collapsing: boolean;
  /** Whether this is a header cell. */
  header: boolean;
  /** Rows for this cell to expand, assuming there is room. */
  rowSpan: number;
}> &
  BoxProps<HTMLTableCellElement>;
