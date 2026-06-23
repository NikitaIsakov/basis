import { beforeEach, describe, expect, it } from 'vitest';
import {
  createLesson,
  deleteLesson,
  fetchLessonById,
  fetchLessonsByCourse,
  reorderLessons,
  updateLesson,
} from '@/entities/lesson/api/lessonApi';
import { mockLessons } from '@/shared/lib/mockDb';

const TEST_COURSE = 'test-course-lessons';

describe('lessonApi mock', () => {
  beforeEach(() => {
    for (let i = mockLessons.length - 1; i >= 0; i -= 1) {
      if (mockLessons[i].courseId === TEST_COURSE) {
        mockLessons.splice(i, 1);
      }
    }
  });

  it('creates, updates, reorders and deletes lessons', async () => {
    const a = await createLesson({
      courseId: TEST_COURSE,
      title: 'Lesson A',
      content: 'A',
    });
    const b = await createLesson({
      courseId: TEST_COURSE,
      title: 'Lesson B',
      content: 'B',
    });

    expect(a.id).not.toBe(b.id);
    expect(a.order).toBe(1);
    expect(b.order).toBe(2);

    const updated = await updateLesson(a.id, { title: 'Lesson A updated' });
    expect(updated.title).toBe('Lesson A updated');

    const reordered = await reorderLessons(TEST_COURSE, [b.id, a.id]);
    expect(reordered[0].id).toBe(b.id);
    expect(reordered[0].order).toBe(1);

    await deleteLesson(a.id);
    const remaining = await fetchLessonsByCourse(TEST_COURSE);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(b.id);
  });

  it('fetchLessonsByCourse returns sorted lessons', async () => {
    const a = await createLesson({
      courseId: TEST_COURSE,
      title: 'Second',
      content: '',
      order: 2,
    });
    const b = await createLesson({
      courseId: TEST_COURSE,
      title: 'First',
      content: '',
      order: 1,
    });

    const list = await fetchLessonsByCourse(TEST_COURSE);
    expect(list[0].id).toBe(b.id);
    expect(list[1].id).toBe(a.id);
  });

  it('fetchLessonById returns undefined for unknown id', async () => {
    expect(await fetchLessonById('missing-lesson-id')).toBeUndefined();
  });
});
