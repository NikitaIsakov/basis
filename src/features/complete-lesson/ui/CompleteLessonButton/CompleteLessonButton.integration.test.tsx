import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '@/features/auth';
import { ToastProvider } from '@/shared/ui';
import { CompleteLessonButton } from './CompleteLessonButton';

const toastMock = vi.fn();
vi.mock('@/shared/ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/ui')>();
  return {
    ...actual,
    useToast: () => ({ showToast: toastMock }),
  };
});

function renderComplete(options?: { disabled?: boolean; completed?: boolean }) {
  const store = configureStore({
    reducer: { session: sessionReducer },
    preloadedState: {
      session: {
        user: {
          id: 'u1',
          email: 'u@t.ru',
          name: 'Student',
          role: 'user' as const,
          enrolledCourseIds: ['c1'],
          completedLessonIds: options?.completed ? ['lesson-1'] : [],
        },
        token: 't',
      },
    },
  });

  return render(
    <Provider store={store}>
      <ToastProvider>
        <CompleteLessonButton
          lessonId="lesson-1"
          disabled={options?.disabled}
          disabledReason="Пройдите викторину"
        />
      </ToastProvider>
    </Provider>,
  );
}

describe('CompleteLessonButton', () => {
  it('completes lesson on click', async () => {
    const user = userEvent.setup();
    renderComplete();

    await user.click(screen.getByRole('button', { name: /завершить урок/i }));
    expect(toastMock).toHaveBeenCalledWith('Урок отмечен как пройденный', 'success');
    expect(screen.getByText(/урок пройден/i)).toBeInTheDocument();
  });

  it('shows disabled reason when blocked', () => {
    renderComplete({ disabled: true });
    expect(screen.getByText('Пройдите викторину')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /завершить урок/i })).toBeDisabled();
  });
});
