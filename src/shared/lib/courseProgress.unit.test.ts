import { describe, expect, it } from 'vitest';
import type { Lesson } from '@/entities/lesson/model/types';
import {
  getCourseProgress,
  getLessonBlocks,
  lessonHasQuiz,
} from './courseProgress';
const lessons: Lesson[] = [
  { id: 'a', courseId: '1', title: 'A', content: '', order: 2 },
  { id: 'b', courseId: '1', title: 'B', content: '', order: 1 },
  { id: 'c', courseId: '1', title: 'C', content: '', order: 3 },
];

describe('getCourseProgress', () => {
  it('returns zero progress for empty lessons', () => {
    expect(getCourseProgress([], [])).toEqual({
      completed: 0,
      total: 0,
      percent: 0,
      nextLessonId: undefined,
    });
  });

  it('calculates percent and next lesson by order', () => {
    expect(getCourseProgress(lessons, ['b'])).toEqual({
      completed: 1,
      total: 3,
      percent: 33,
      nextLessonId: 'a',
    });
  });

  it('returns no next lesson when all completed', () => {
    expect(getCourseProgress(lessons, ['a', 'b', 'c']).nextLessonId).toBeUndefined();
  });
});

describe('lessonHasQuiz', () => {
  it('returns true when lesson has quiz block', () => {
    const lesson: Lesson = {
      id: '1',
      courseId: '1',
      title: 'Q',
      content: '',
      order: 1,
      blocks: [{ type: 'quiz', question: 'Q?', options: ['A', 'B'], correctIndex: 0 }],
    };
    expect(lessonHasQuiz(lesson)).toBe(true);
  });

  it('returns false for text-only lesson', () => {
    expect(lessonHasQuiz(lessons[0])).toBe(false);
  });
});

describe('getLessonBlocks', () => {
  it('returns blocks when present', () => {
    const lesson: Lesson = {
      id: '1',
      courseId: '1',
      title: 'B',
      content: 'fallback',
      order: 1,
      blocks: [{ type: 'text', body: 'Block text' }],
    };
    expect(getLessonBlocks(lesson)).toEqual([{ type: 'text', body: 'Block text' }]);
  });

  it('falls back to content as text block', () => {
    const lesson: Lesson = {
      id: '1',
      courseId: '1',
      title: 'C',
      content: 'Plain content',
      order: 1,
    };
    expect(getLessonBlocks(lesson)).toEqual([{ type: 'text', body: 'Plain content' }]);
  });
});
