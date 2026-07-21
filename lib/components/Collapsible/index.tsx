import clsx from 'clsx';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transitioning';
import { useButton } from 'ss13-ui-kit/hooks/useButton';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import type { CollapsibleContentProps, CollapsibleProps } from './types';

export function Collapsible(props: CollapsibleProps) {
  const { children, color, title, buttons, icon, open } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open || false);
  const interactions = useButton({
    onClick: () => setIsOpen(!isOpen),
  });

  return (
    <Stack
      g={0}
      vertical
      className={clsx(
        'collapsible',
        `bg-${color || 'primary'}`,
        isOpen && 'is-open',
      )}
    >
      <Stack className="collapsible-controls">
        <Stack className="collapsible-button" {...interactions}>
          {icon ? <Icon {...icon} /> : <CollapsibleIcon />}
          <Stack.Item grow className="collapsible-title">
            {title}
          </Stack.Item>
        </Stack>
        {buttons && <Stack className="collapsible-buttons">{buttons}</Stack>}
      </Stack>
      <CollapsibleContent isOpen={isOpen}>{children}</CollapsibleContent>
    </Stack>
  );
}

function CollapsibleContent(props: CollapsibleContentProps) {
  const { children, isOpen } = props;
  const contentRef = useRef(null);

  return (
    <CSSTransition in={isOpen} duration={200} classNames="collapsible">
      <Stack ref={contentRef} className="collapsible-content-wrapper">
        <Stack.Item grow className="collapsible-content">
          <div className="collapsible-content-container">{children}</div>
        </Stack.Item>
      </Stack>
    </CSSTransition>
  );
}

function CollapsibleIcon() {
  const iconClassName = 'collapsible-icon';

  return (
    <div className={iconClassName}>
      <div className={clsx(iconClassName, `${iconClassName}-1`)} />
      <div className={clsx(iconClassName, `${iconClassName}-2`)} />
      <div className={clsx(iconClassName, `${iconClassName}-3`)} />
    </div>
  );
}
