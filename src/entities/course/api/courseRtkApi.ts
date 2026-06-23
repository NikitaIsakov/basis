import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Course, CreateCourseDto, UpdateCourseDto } from '../model/types';
import * as courseApi from './courseApi';

export const courseRtkApi = createApi({
  reducerPath: 'courseRtkApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], boolean | void>({
      async queryFn(includeHidden = false) {
        try {
          const data = await courseApi.fetchCourses(Boolean(includeHidden));
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: ['Course'],
    }),
    getCourse: builder.query<Course | undefined, string>({
      async queryFn(id) {
        try {
          const data = await courseApi.fetchCourseById(id);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, id) => [{ type: 'Course', id }],
    }),
    getCoursesByAuthor: builder.query<Course[], string>({
      async queryFn(authorId) {
        try {
          const data = await courseApi.fetchCoursesByAuthor(authorId);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, authorId) => [
        { type: 'Course', id: `author-${authorId}` },
      ],
    }),
    createCourse: builder.mutation<Course, CreateCourseDto>({
      async queryFn(dto) {
        try {
          const data = await courseApi.createCourse(dto);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, dto) => [
        'Course',
        { type: 'Course', id: `author-${dto.authorId}` },
      ],
    }),
    updateCourse: builder.mutation<Course, { id: string; dto: UpdateCourseDto }>({
      async queryFn({ id, dto }) {
        try {
          const data = await courseApi.updateCourse(id, dto);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: ['Course'],
    }),
    setCourseHidden: builder.mutation<Course, { id: string; hidden: boolean }>({
      async queryFn({ id, hidden }) {
        try {
          const data = await courseApi.setCourseHidden(id, hidden);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetCoursesByAuthorQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useSetCourseHiddenMutation,
} = courseRtkApi;

export {
  useGetLessonsByCourseQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useReorderLessonsMutation,
} from '@/entities/lesson/api/lessonRtkApi';
