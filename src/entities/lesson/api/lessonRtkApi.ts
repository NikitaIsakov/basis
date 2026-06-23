import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateLessonDto,
  Lesson,
  UpdateLessonDto,
} from '../model/types';
import * as lessonApi from './lessonApi';

export const lessonRtkApi = createApi({
  reducerPath: 'lessonRtkApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Lesson'],
  endpoints: (builder) => ({
    getLessonsByCourse: builder.query<Lesson[], string>({
      async queryFn(courseId) {
        try {
          const data = await lessonApi.fetchLessonsByCourse(courseId);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, courseId) => [{ type: 'Lesson', id: courseId }],
    }),
    getLesson: builder.query<Lesson | undefined, string>({
      async queryFn(lessonId) {
        try {
          const data = await lessonApi.fetchLessonById(lessonId);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, id) => [{ type: 'Lesson', id: `item-${id}` }],
    }),
    createLesson: builder.mutation<Lesson, CreateLessonDto>({
      async queryFn(dto) {
        try {
          const data = await lessonApi.createLesson(dto);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, dto) => [{ type: 'Lesson', id: dto.courseId }],
    }),
    updateLesson: builder.mutation<
      Lesson,
      { id: string; dto: UpdateLessonDto; courseId: string }
    >({
      async queryFn({ id, dto }) {
        try {
          const data = await lessonApi.updateLesson(id, dto);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, { courseId }) => [
        { type: 'Lesson', id: courseId },
      ],
    }),
    deleteLesson: builder.mutation<void, { id: string; courseId: string }>({
      async queryFn({ id }) {
        try {
          await lessonApi.deleteLesson(id);
          return { data: undefined };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, { courseId }) => [
        { type: 'Lesson', id: courseId },
      ],
    }),
    reorderLessons: builder.mutation<
      Lesson[],
      { courseId: string; orderedIds: string[] }
    >({
      async queryFn({ courseId, orderedIds }) {
        try {
          const data = await lessonApi.reorderLessons(courseId, orderedIds);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, { courseId }) => [
        { type: 'Lesson', id: courseId },
      ],
    }),
  }),
});

export const {
  useGetLessonsByCourseQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useReorderLessonsMutation,
} = lessonRtkApi;
