import { afterEach, describe, expect, it } from 'bun:test';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Collapsible } from '.';

describe('Collapsible Component', () => {
  afterEach(cleanup);

  it('renders with title and is closed by default', () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Toggle Me">
        <p>Hidden Content</p>
      </Collapsible>,
    );

    expect(getByText('Toggle Me')).toBeTruthy();
    expect(queryByText('Hidden Content')).toBeFalsy();
  });

  it('opens and shows content when clicked', () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Toggle Me">
        <p>Hidden Content</p>
      </Collapsible>,
    );

    const button = getByText('Toggle Me');
    fireEvent.click(button);

    expect(queryByText('Hidden Content')).toBeTruthy();
  });

  it('respects the initial open prop', () => {
    const { queryByText } = render(
      <Collapsible title="Title" open>
        <p>Visible Content</p>
      </Collapsible>,
    );

    expect(queryByText('Visible Content')).toBeTruthy();
  });

  it('renders extra buttons if provided', () => {
    const { getByText } = render(
      <Collapsible title="Title" buttons={<button>Extra</button>} />,
    );

    expect(getByText('Extra')).toBeTruthy();
  });

  it('renders a custom icon if provided instead of sandwich', () => {
    const { container } = render(
      <Collapsible title="Title" startIcon="star" />,
    );

    expect(container.querySelector('.fa-star')).toBeTruthy();
    expect(container.querySelector('.collapsible-icon')).toBeFalsy();
  });

  it('renders endIcon if provided', () => {
    const { container } = render(<Collapsible title="Title" endIcon="cog" />);

    expect(container.querySelector('.fa-gear')).toBeTruthy();
  });
});
