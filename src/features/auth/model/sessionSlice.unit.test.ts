import { describe, it, expect, beforeEach } from 'vitest';
import {
  sessionReducer,
  setSession,
  enrollCourse,
  clearSession,
  completeLesson,
} from './sessionSlice';

const baseUser = {
  id: '1',
  email: 'a@b.ru',
  name: 'Test',
  role: 'user' as const,
  enrolledCourseIds: [] as string[],
  completedLessonIds: [] as string[],
};

describe('sessionSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('сохраняет пользователя при setSession', () => {
    const state = sessionReducer(
      { user: null, token: null },
      setSession({ user: baseUser, token: 't1' }),
    );
    expect(state.user?.email).toBe('a@b.ru');
    expect(state.token).toBe('t1');
  });

  it('добавляет курс в enrolledCourseIds', () => {
    let state = sessionReducer(
      { user: baseUser, token: 't1' },
      setSession({ user: baseUser, token: 't1' }),
    );
    state = sessionReducer(state, enrollCourse('course-1'));
    expect(state.user?.enrolledCourseIds).toContain('course-1');
  });

  it('добавляет урок в completedLessonIds', () => {
    let state = sessionReducer(
      { user: baseUser, token: 't1' },
      setSession({ user: baseUser, token: 't1' }),
    );
    state = sessionReducer(state, completeLesson('lesson-1'));
    expect(state.user?.completedLessonIds).toContain('lesson-1');
  });

  it('очищает сессию при clearSession', () => {
    const state = sessionReducer(
      { user: baseUser, token: 't' },
      clearSession(),
    );
    expect(state.user).toBeNull();
  });
});
