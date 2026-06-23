import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/shared/types/roles';

interface SessionState {
  user: User | null;
  token: string | null;
}

function normalizeUser(user: User | null): User | null {
  if (!user) return null;
  return {
    ...user,
    enrolledCourseIds: user.enrolledCourseIds ?? [],
    completedLessonIds: user.completedLessonIds ?? [],
  };
}

const stored = localStorage.getItem('session');
const parsed: SessionState = stored
  ? JSON.parse(stored)
  : { user: null, token: null };
const initial: SessionState = {
  ...parsed,
  user: normalizeUser(parsed.user),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: initial,
  reducers: {
    setSession(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = normalizeUser(action.payload.user);
      state.token = action.payload.token;
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem(
        'session',
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        }),
      );
    },
    clearSession(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('session');
    },
    enrollCourse(state, action: PayloadAction<string>) {
      if (state.user && !state.user.enrolledCourseIds.includes(action.payload)) {
        state.user.enrolledCourseIds.push(action.payload);
        localStorage.setItem(
          'session',
          JSON.stringify({ user: state.user, token: state.token }),
        );
      }
    },
    completeLesson(state, action: PayloadAction<string>) {
      if (
        state.user &&
        !state.user.completedLessonIds.includes(action.payload)
      ) {
        state.user.completedLessonIds.push(action.payload);
        localStorage.setItem(
          'session',
          JSON.stringify({ user: state.user, token: state.token }),
        );
      }
    },
  },
});

export const { setSession, clearSession, enrollCourse, completeLesson } =
  sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
