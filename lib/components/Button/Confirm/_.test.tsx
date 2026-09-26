import { describe, expect, it } from 'bun:test';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Confirm } from '.';

describe('Confirm Component', () => {
  it('reacts on holding', async () => {
    const { container } = render(<Confirm />);
    const button = container.querySelector('.button-confirm');
    if (button) {
      fireEvent.mouseDown(button);
      expect(button.querySelector('.holding')).toBeTruthy();
      fireEvent.mouseUp(button);
      expect(button.querySelector('.holding')).toBeFalsy();
    }
  });

  it('confirmation with custom delay', async () => {
    const { container } = render(
      <Confirm confirmDelay={1000} confirmedContent="Confirmed">
        Hold Me
      </Confirm>,
    );

    const button = container.querySelector('.button-confirm');
    if (button) {
      fireEvent.mouseDown(button);
      expect(button.querySelector('.confirmed')).toBeFalsy();

      await waitFor(() => expect(container.querySelector('.confirmed')).toBeTruthy(), {
        timeout: 1050,
      });
    }
  });

  it('failed confirmation', async () => {
    const { container } = render(<Confirm />);
    const button = container.querySelector('.button-confirm');
    if (button) {
      fireEvent.mouseDown(button);
      expect(button.querySelector('.canceled')).toBeFalsy();
      fireEvent.mouseUp(button);
      expect(button.querySelector('.canceled')).toBeTruthy();
    }
  });
});
