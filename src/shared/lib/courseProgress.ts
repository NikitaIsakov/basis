import type { Lesson, LessonBlock } from '@/entities/lesson/model/types';

export interface CourseProgress {
  completed: number;
  total: number;
  percent: number;
  nextLessonId?: string;
}

export function getCourseProgress(
  lessons: Lesson[],
  completedLessonIds: string[],
): CourseProgress {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const total = sorted.length;
  const completed = sorted.filter((l) => completedLessonIds.includes(l.id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const nextLesson = sorted.find((l) => !completedLessonIds.includes(l.id));

  return {
    completed,
    total,
    percent,
    nextLessonId: nextLesson?.id,
  };
}

export function lessonHasQuiz(lesson: Lesson): boolean {
  return lesson.blocks?.some((b) => b.type === 'quiz') ?? false;
}

export function getLessonBlocks(lesson: Lesson): LessonBlock[] {
  if (lesson.blocks?.length) return lesson.blocks;
  if (lesson.content) {
    return [{ type: 'text', body: lesson.content }];
  }
  return [];
}
