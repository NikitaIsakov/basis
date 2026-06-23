import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '@/features/auth';
import { ToastProvider } from '@/shared/ui';
import { EnrollButton } from './EnrollButton';

const toastMock = vi.fn();
vi.mock('@/shared/ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/ui')>();
  return {
    ...actual,
    useToast: () => ({ showToast: toastMock }),
  };
});

function renderEnroll(userRole: 'user' | 'author', enrolled: string[] = []) {
  const store = configureStore({
    reducer: { session: sessionReducer },
    preloadedState: {
      session: {
        user: {
          id: 'u1',
          email: 'u@t.ru',
          name: 'Student',
          role: userRole,
          enrolledCourseIds: enrolled,
          completedLessonIds: [],
        },
        token: 't',
      },
    },
  });

  return render(
    <Provider store={store}>
      <ToastProvider>
        <EnrollButton courseId="course-1" />
      </ToastProvider>
    </Provider>,
  );
}

describe('EnrollButton', () => {
  it('enrolls student on click', async () => {
    const user = userEvent.setup();
    renderEnroll('user');

    await user.click(screen.getByRole('button', { name: /записаться/i }));

    expect(toastMock).toHaveBeenCalledWith('Вы записаны на курс', 'success');
    expect(screen.getByText(/уже записаны/i)).toBeInTheDocument();
  });

  it('shows message for non-student roles', () => {
    renderEnroll('author');
    expect(screen.getByText(/войдите как студент/i)).toBeInTheDocument();
  });
});
