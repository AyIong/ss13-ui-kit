import type { PrimitiveAtom } from 'jotai';
import type React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export type TitleBarProps = Partial<{
  children: ReactNode;
  className: string;
  title: string;
  status: number;
  canClose: boolean;
  styles: CSSProperties;
  kitchenSinkAtom: PrimitiveAtom<boolean>;
  onClose: (event) => void;
  onDragStart: (event: React.MouseEvent<HTMLDivElement>) => void;
}>;
