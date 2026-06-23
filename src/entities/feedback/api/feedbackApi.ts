import { axiosInstance } from '@/shared/api';
import { mockFeedback } from '@/shared/lib/mockData';
import type { CourseFeedback, SendFeedbackDto } from '../model/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function fetchFeedbackByCourse(
  courseId: string,
  studentId?: string,
): Promise<CourseFeedback[]> {
  if (USE_MOCK) {
    return mockFeedback
      .filter(
        (f) =>
          f.courseId === courseId &&
          (!studentId || f.studentId === studentId),
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }
  const params: Record<string, string> = { courseId };
  if (studentId) params.studentId = studentId;
  const { data } = await axiosInstance.get<CourseFeedback[]>('/feedback', {
    params,
  });
  return data;
}

export async function fetchFeedbackByAuthor(
  authorId: string,
): Promise<CourseFeedback[]> {
  if (USE_MOCK) {
    return mockFeedback
      .filter((f) => f.authorId === authorId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
  const { data } = await axiosInstance.get<CourseFeedback[]>('/feedback', {
    params: { authorId },
  });
  return data;
}

export async function sendFeedback(dto: SendFeedbackDto): Promise<CourseFeedback> {
  if (USE_MOCK) {
    const item: CourseFeedback = {
      id: `fb-${Date.now()}`,
      ...dto,
      createdAt: new Date().toISOString(),
    };
    mockFeedback.push(item);
    return item;
  }
  const { data } = await axiosInstance.post<CourseFeedback>('/feedback', dto);
  return data;
}

export async function replyToFeedback(
  id: string,
  reply: string,
): Promise<CourseFeedback> {
  if (USE_MOCK) {
    const index = mockFeedback.findIndex((f) => f.id === id);
    if (index === -1) throw new Error('Сообщение не найдено');
    mockFeedback[index] = {
      ...mockFeedback[index],
      reply,
      repliedAt: new Date().toISOString(),
    };
    return mockFeedback[index];
  }
  const { data } = await axiosInstance.patch<CourseFeedback>(`/feedback/${id}`, {
    reply,
    repliedAt: new Date().toISOString(),
  });
  return data;
}
