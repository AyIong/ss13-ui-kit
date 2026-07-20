import clsx from 'clsx';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transitioning';
import { useButton } from 'ss13-ui-kit/hooks/useButton';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import type { CollapsibleContentProps, CollapsibleProps } from './types';

export function Collapsible(props: CollapsibleProps) {
  const { children, childrenStyles, color, title, buttons, icon, open } = props;

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
      <CollapsibleContent isOpen={isOpen} childrenStyles={childrenStyles}>
        {children}
      </CollapsibleContent>
    </Stack>
  );
}

function CollapsibleContent(props: CollapsibleContentProps) {
  const { children, isOpen, childrenStyles } = props;
  const contentRef = useRef(null);

  return (
    <CSSTransition in={isOpen} duration={200} classNames="collapsible">
      <Stack.Item
        className="collapsible-content-wrapper"
        ref={contentRef}
        style={childrenStyles}
      >
        <div className="collapsible-content">{children}</div>
      </Stack.Item>
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
