import type { PrimitiveAtom } from 'jotai';
import type { CSSProperties, PropsWithChildren } from 'react';

export type TitleBarProps = Partial<{
  className: string;
  title: string;
  status: number;
  canClose: boolean;
  styles: CSSProperties;
  kitchenSinkAtom: PrimitiveAtom<boolean>;
  onClose: (e) => void;
  onDragStart: (e) => void;
}> &
  PropsWithChildren;
