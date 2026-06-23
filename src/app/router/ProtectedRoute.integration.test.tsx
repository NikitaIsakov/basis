import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '@/features/auth';
import type { UserRole } from '@/shared/types/roles';
import { ProtectedRoute } from './ProtectedRoute';

function renderWithRole(role: Exclude<UserRole, 'guest'> | null) {
  const store = configureStore({
    reducer: {
      session: sessionReducer,
    },
    preloadedState: {
      session: {
        user: role
          ? {
              id: '1',
              email: 'u@t.ru',
              name: 'U',
              role,
              enrolledCourseIds: [],
              completedLessonIds: [],
            }
          : null,
        token: role ? 't' : null,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="protected" element={<div>Secret</div>} />
          </Route>
          <Route path="login" element={<div>Login page</div>} />
          <Route path="403" element={<div>Forbidden</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('перенаправляет гостя на login', () => {
    renderWithRole(null);
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('перенаправляет пользователя без роли на 403', () => {
    renderWithRole('user');
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
  });

  it('пускает администратора', () => {
    renderWithRole('admin');
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });

  it('пускает автора на author-only маршрут', () => {
    const store = configureStore({
      reducer: { session: sessionReducer },
      preloadedState: {
        session: {
          user: {
            id: '1',
            email: 'a@t.ru',
            name: 'Author',
            role: 'author' as const,
            enrolledCourseIds: [],
            completedLessonIds: [],
          },
          token: 't',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute roles={['author']} />}>
              <Route path="protected" element={<div>Author area</div>} />
            </Route>
            <Route path="403" element={<div>Forbidden</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Author area')).toBeInTheDocument();
  });
});
