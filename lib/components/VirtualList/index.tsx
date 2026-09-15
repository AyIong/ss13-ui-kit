import type { PropsWithChildren } from 'react';
import { VList } from 'virtua';

export function VirtualList(props: PropsWithChildren) {
  return <VList className="virtuallist">{props.children}</VList>;
}
