export type { CourseFeedback, SendFeedbackDto } from './model/types';
export {
  useGetFeedbackByCourseQuery,
  useGetFeedbackByAuthorQuery,
  useSendFeedbackMutation,
  useReplyToFeedbackMutation,
} from './api/feedbackRtkApi';
