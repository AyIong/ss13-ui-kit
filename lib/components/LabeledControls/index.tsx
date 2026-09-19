import { Stack, type StackProps } from '@components';
import clsx from 'clsx';
import { colorClassName } from 'tgui-core/common/color';
import type { LabeledControlsItemProps } from './types';

/**
 * ## LabeledControls
 *
 * LabeledControls is a horizontal grid that is designed to hold various
 * controls, like [Knobs](https://github.com/tgstation/tgui-core/tree/main/lib/components/Knob.tsx)
 * or small [Buttons](https://github.com/tgstation/tgui-core/tree/main/lib/components/Button.tsx).
 *
 * Every item in this grid is labeled at the bottom.
 *
 * Example:
 *
 * ```tsx
 * <LabeledControls>
 *   <LabeledControls.Item label="Temperature"><Knob /></LabeledControls.Item>
 *   <LabeledControls.Item label="Submit"><Button /></LabeledControls.Item>
 * </LabeledControls>
 * ```
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-labeledcontrols--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function LabeledControls(props: StackProps) {
  const { children, ...rest } = props;
  return (
    <Stack className="labeledcontrols" {...rest}>
      {children}
    </Stack>
  );
}

function LabeledControlsItem(props: LabeledControlsItemProps) {
  const { label, children, ...rest } = props;

  return (
    <Stack vertical className="labeledcontrols-item" {...rest}>
      <Stack.Item>{children}</Stack.Item>
      <Stack.Item className={clsx('labeledcontrols-item--label', colorClassName('label'))}>
        {label}
      </Stack.Item>
    </Stack>
  );
}

LabeledControls.Item = LabeledControlsItem;
