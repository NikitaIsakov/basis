import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '@/features/auth';
import { courseRtkApi } from '@/entities/course/api/courseRtkApi';
import { lessonRtkApi } from '@/entities/lesson/api/lessonRtkApi';
import { authorRtkApi } from '@/entities/author/api/authorRtkApi';
import { feedbackRtkApi } from '@/entities/feedback/api/feedbackRtkApi';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [courseRtkApi.reducerPath]: courseRtkApi.reducer,
    [lessonRtkApi.reducerPath]: lessonRtkApi.reducer,
    [authorRtkApi.reducerPath]: authorRtkApi.reducer,
    [feedbackRtkApi.reducerPath]: feedbackRtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      courseRtkApi.middleware,
      lessonRtkApi.middleware,
      authorRtkApi.middleware,
      feedbackRtkApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
