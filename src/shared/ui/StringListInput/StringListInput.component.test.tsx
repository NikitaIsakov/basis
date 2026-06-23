import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StringListInput } from './StringListInput';

describe('StringListInput', () => {
  it('adds a new empty item', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <StringListInput label="Items" values={['One']} onChange={onChange} />,
    );

    await user.click(screen.getByRole('button', { name: /добавить пункт/i }));
    expect(onChange).toHaveBeenCalledWith(['One', '']);
  });

  it('removes an item when above minItems', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <StringListInput
        label="Items"
        values={['One', 'Two']}
        onChange={onChange}
        minItems={1}
      />,
    );

    const removeButtons = screen.getAllByRole('button', { name: /удалить пункт/i });
    await user.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(['Two']);
  });

  it('does not remove below minItems', () => {
    const onChange = vi.fn();

    render(
      <StringListInput
        label="Items"
        values={['Only']}
        onChange={onChange}
        minItems={1}
      />,
    );

    expect(screen.queryByRole('button', { name: /удалить пункт/i })).not.toBeInTheDocument();
  });
});
