import { useEffect, useState } from 'react';
import type { BlinkProps } from './types';

const DEFAULT_BLINKING_INTERVAL = 1000;
const DEFAULT_BLINKING_TIME = 1000;

/**
 * ## Blink
 *
 * A component that blinks its children at a specified interval.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-blink--docs)
 */
export function Blink(props: BlinkProps) {
  const {
    children,
    interval = DEFAULT_BLINKING_INTERVAL,
    time = DEFAULT_BLINKING_TIME,
  } = props;

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHidden(true);
      setTimeout(() => {
        setHidden(false);
      }, time);
    }, interval + time);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, time]);

  return (
    <span
      style={{
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      {children}
    </span>
  );
}
