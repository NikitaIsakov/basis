import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CourseFeedback, SendFeedbackDto } from '../model/types';
import * as feedbackApi from './feedbackApi';

export const feedbackRtkApi = createApi({
  reducerPath: 'feedbackRtkApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getFeedbackByCourse: builder.query<
      CourseFeedback[],
      { courseId: string; studentId?: string }
    >({
      async queryFn({ courseId, studentId }) {
        try {
          const data = await feedbackApi.fetchFeedbackByCourse(
            courseId,
            studentId,
          );
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, { courseId }) => [
        { type: 'Feedback', id: courseId },
      ],
    }),
    getFeedbackByAuthor: builder.query<CourseFeedback[], string>({
      async queryFn(authorId) {
        try {
          const data = await feedbackApi.fetchFeedbackByAuthor(authorId);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      providesTags: (_r, _e, authorId) => [
        { type: 'Feedback', id: `author-${authorId}` },
      ],
    }),
    sendFeedback: builder.mutation<CourseFeedback, SendFeedbackDto>({
      async queryFn(dto) {
        try {
          const data = await feedbackApi.sendFeedback(dto);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, dto) => [
        { type: 'Feedback', id: dto.courseId },
        { type: 'Feedback', id: `author-${dto.authorId}` },
      ],
    }),
    replyToFeedback: builder.mutation<
      CourseFeedback,
      { id: string; reply: string; courseId: string; authorId: string }
    >({
      async queryFn({ id, reply }) {
        try {
          const data = await feedbackApi.replyToFeedback(id, reply);
          return { data };
        } catch (error) {
          return { error: error as Error };
        }
      },
      invalidatesTags: (_r, _e, { courseId, authorId }) => [
        { type: 'Feedback', id: courseId },
        { type: 'Feedback', id: `author-${authorId}` },
      ],
    }),
  }),
});

export const {
  useGetFeedbackByCourseQuery,
  useGetFeedbackByAuthorQuery,
  useSendFeedbackMutation,
  useReplyToFeedbackMutation,
} = feedbackRtkApi;
