import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminCourseList } from './AdminCourseList';

const showToast = vi.fn();
const setHidden = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));

vi.mock('@/shared/ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/ui')>();
  return {
    ...actual,
    useToast: () => ({ showToast }),
  };
});

vi.mock('@/entities/course/api/courseRtkApi', () => ({
  useGetCoursesQuery: () => ({
    data: [
      {
        id: '1',
        title: 'Public course',
        category: 'Design',
        price: 1000,
        hidden: false,
      },
    ],
    isLoading: false,
    error: undefined,
  }),
  useSetCourseHiddenMutation: () => [setHidden, { isLoading: false }],
}));

describe('AdminCourseList', () => {
  it('calls setCourseHidden when toggling visibility', async () => {
    const user = userEvent.setup();
    render(<AdminCourseList />);

    await user.click(screen.getByRole('button', { name: /скрыть/i }));
    expect(setHidden).toHaveBeenCalledWith({ id: '1', hidden: true });
  });
});
