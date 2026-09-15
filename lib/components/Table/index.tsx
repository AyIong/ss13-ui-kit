import { computeBoxClassName, computeBoxProps } from '@common/ui';
import clsx from 'clsx';
import type { CellProps, RowProps, TableProps } from './types';

export function Table(props: TableProps) {
  const { className, collapsing, children, ...rest } = props;
  return (
    <table
      className={clsx('table', collapsing && 'collapsing', className, computeBoxClassName(rest))}
      {...computeBoxProps(rest)}
    >
      <tbody>{children}</tbody>
    </table>
  );
}

function TableRow(props: RowProps) {
  const { className, header, ...rest } = props;
  return (
    <tr
      className={clsx(
        'table-row',
        header && 'header',
        className,
        computeBoxClassName<HTMLTableRowElement>(props),
      )}
      {...computeBoxProps(rest)}
    />
  );
}

function TableCell(props: CellProps) {
  const { className, collapsing, colSpan, header, ...rest } = props;
  return (
    <td
      className={clsx(
        'table-cell',
        collapsing && 'collapsing',
        header && 'header',
        className,
        computeBoxClassName(props),
      )}
      colSpan={colSpan}
      {...computeBoxProps(rest)}
    />
  );
}

/**
 * ## Table
 *
 * A straight forward mapping to a standard html table, which is slightly
 * simplified (does not need a `<tbody>` tag) and with sane default styles
 * (e.g. table width is 100% by default).
 *
 * Example:
 *
 * ```tsx
 * <Table>
 *   <Table.Row>
 *     <Table.Cell bold>Hello world!</Table.Cell>
 *     <Table.Cell collapsing color="label">
 *       Label
 *     </Table.Cell>
 *   </Table.Row>
 * </Table>
 * ```
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-table--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export namespace Table {
  /**
   * ## Table.Cell
   * A straight forward mapping to `<td>` element.
   */
  export const Cell = TableCell;
  /**
   * ## Table.Row
   * A straight forward mapping to `<tr>` element.
   */
  export const Row = TableRow;
}
