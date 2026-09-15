import { formatTime } from '@common/format';
import { isSafeNumber } from '@common/math';
import { useEffect, useRef, useState } from 'react';
import type { TimeDisplayProps } from './types';

/**
 * ## TimeDisplay
 *
 * A simple component to format and display time values.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-timedisplay--docs)
 */
export function TimeDisplay(props: TimeDisplayProps) {
  const { value: initialValue, auto, format = undefined } = props;

  const timerRef = useRef<NodeJS.Timeout>(null);
  const [currentValue, setCurrentValue] = useState<number>(
    isSafeNumber(initialValue) ? initialValue : 0,
  );
  const [lastSeenValue, setLastSeenValue] = useState<number | undefined>(
    isSafeNumber(initialValue) ? initialValue : undefined,
  );

  // Manage the timer setup and cleanup
  useEffect(() => {
    if (auto) {
      timerRef.current = setInterval(() => {
        const mod = auto === 'up' ? 10 : -10;
        setCurrentValue((prev) => Math.max(0, prev + mod));
      }, 1000); // Every 1s
    }

    // cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [auto]);

  // Handle updates to the value prop
  useEffect(() => {
    if (initialValue !== lastSeenValue) {
      setLastSeenValue(initialValue);
      setCurrentValue(initialValue);
    }
  }, [initialValue, lastSeenValue]);

  // Directly display weird stuff
  if (!isSafeNumber(initialValue)) {
    return initialValue || null;
  }

  return format ? format(currentValue) : formatTime(currentValue);
}
