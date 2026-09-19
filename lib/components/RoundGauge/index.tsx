import clsx from 'clsx';
import type { RoundGaugeProps } from './types';

export function RoundGauge(props: RoundGaugeProps) {
  const { children, className } = props;

  return <div className={clsx('roundgauge', className)}>{children}</div>;
}
