import { axiosInstance } from '@/shared/api';
import { mockLessons } from '@/shared/lib/mockDb';
import type {
  CreateLessonDto,
  Lesson,
  UpdateLessonDto,
} from '../model/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

let mockLessonCounter = 0;

export async function fetchLessonsByCourse(courseId: string): Promise<Lesson[]> {
  if (USE_MOCK) {
    return mockLessons
      .filter((l) => l.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }
  const { data } = await axiosInstance.get<Lesson[]>(
    `/lessons?courseId=${courseId}`,
  );
  return data.sort((a, b) => a.order - b.order);
}

export async function fetchLessonById(id: string): Promise<Lesson | undefined> {
  if (USE_MOCK) return mockLessons.find((l) => l.id === id);
  const { data } = await axiosInstance.get<Lesson>(`/lessons/${id}`);
  return data;
}

function nextOrder(courseId: string): number {
  const courseLessons = mockLessons.filter((l) => l.courseId === courseId);
  if (courseLessons.length === 0) return 1;
  return Math.max(...courseLessons.map((l) => l.order)) + 1;
}

export async function createLesson(dto: CreateLessonDto): Promise<Lesson> {
  if (USE_MOCK) {
    const lesson: Lesson = {
      id: `l-${dto.courseId}-${Date.now()}-${++mockLessonCounter}`,
      courseId: dto.courseId,
      title: dto.title,
      content: dto.content ?? '',
      order: dto.order ?? nextOrder(dto.courseId),
      durationMinutes: dto.durationMinutes ?? 10,
      blocks: dto.blocks,
    };
    mockLessons.push(lesson);
    return lesson;
  }
  const { data } = await axiosInstance.post<Lesson>('/lessons', dto);
  return data;
}

export async function updateLesson(
  id: string,
  dto: UpdateLessonDto,
): Promise<Lesson> {
  if (USE_MOCK) {
    const index = mockLessons.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Урок не найден');
    mockLessons[index] = { ...mockLessons[index], ...dto };
    return mockLessons[index];
  }
  const { data } = await axiosInstance.patch<Lesson>(`/lessons/${id}`, dto);
  return data;
}

export async function deleteLesson(id: string): Promise<void> {
  if (USE_MOCK) {
    const index = mockLessons.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Урок не найден');
    mockLessons.splice(index, 1);
    return;
  }
  await axiosInstance.delete(`/lessons/${id}`);
}

export async function reorderLessons(
  courseId: string,
  orderedIds: string[],
): Promise<Lesson[]> {
  if (USE_MOCK) {
    orderedIds.forEach((id, index) => {
      const lesson = mockLessons.find((l) => l.id === id && l.courseId === courseId);
      if (lesson) lesson.order = index + 1;
    });
    return fetchLessonsByCourse(courseId);
  }
  const { data } = await axiosInstance.patch<Lesson[]>(
    `/lessons/reorder`,
    { courseId, orderedIds },
  );
  return data;
}
