import clsx from 'clsx';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transitioning';
import { useButton } from 'ss13-ui-kit/hooks/useButton';
import { Icon } from '../Icon';
import type { CollapsibleContentProps, CollapsibleProps } from './types';

export function Collapsible(props: CollapsibleProps) {
  const { children, color, title, buttons, icon, open } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open || false);
  const interactions = useButton({
    onClick: () => setIsOpen(!isOpen),
  });

  return (
    <div
      className={clsx(
        'collapsible',
        `bg-${color || 'primary'}`,
        isOpen && 'is-open',
      )}
    >
      <div className="collapsible-controls">
        <div className="collapsible-button" {...interactions}>
          {icon ? <Icon {...icon} /> : <CollapsibleIcon />}
          <div className="collapsible-title">{title}</div>
        </div>
        {buttons && <div className="collapsible-buttons">{buttons}</div>}
      </div>
      <CollapsibleContent isOpen={isOpen}>{children}</CollapsibleContent>
    </div>
  );
}

function CollapsibleContent(props: CollapsibleContentProps) {
  const { children, isOpen } = props;
  const contentRef = useRef(null);

  return (
    <CSSTransition in={isOpen} duration={200} classNames="collapsible">
      <div ref={contentRef} className="collapsible-content-wrapper">
        <div className="collapsible-content">
          <section className="collapsible-content-container">
            {children}
          </section>
        </div>
      </div>
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
