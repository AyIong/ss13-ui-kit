import { Image } from '../Image';
import { Direction, type DmIconProps } from './types';

/**
 * ## DmIcon
 *
 * Displays an icon from the BYOND icon reference map. Requires Byond 515+.
 * A much faster alternative to base64 icons.
 */
export function DmIcon(props: DmIconProps) {
  const { direction, fallback, icon, icon_state, frame, movement, ...rest } =
    props;

  const iconRef = Byond.iconRefMap?.[icon];
  if (!iconRef) {
    return fallback;
  }

  const query = `${iconRef}?state=${icon_state}&dir=${direction || Direction.SOUTH}&movement=${!!movement}&frame=${frame || 1}`;
  return <Image fixErrors src={query} {...rest} />;
}
