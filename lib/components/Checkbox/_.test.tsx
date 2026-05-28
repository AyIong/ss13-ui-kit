import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Checkbox } from '.';

describe('Checkbox Component', () => {
  it('renders checked and unchecked states', () => {
    const { rerender, container } = render(<Checkbox checked />);

    expect(container.querySelector('.selected')).toBeTruthy();

    rerender(<Checkbox checked={false} />);
    expect(container.querySelector('.selected')).toBeFalsy();
  });
});
