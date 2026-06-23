import { afterEach, describe, expect, it } from 'vitest';
import {
  createCourse,
  fetchCourses,
  fetchCoursesByAuthor,
  setCourseHidden,
  updateCourse,
} from '@/entities/course/api/courseApi';
import { mockCourses } from '@/shared/lib/mockDb';

const TEST_AUTHOR = 'test-author-api';

describe('courseApi fetchCoursesByAuthor', () => {
  it('returns only courses for the author including hidden', async () => {
    const courses = await fetchCoursesByAuthor('author-1');
    const expected = mockCourses.filter((c) => c.authorId === 'author-1');

    expect(courses).toHaveLength(expected.length);
    expect(courses.every((c) => c.authorId === 'author-1')).toBe(true);
    expect(courses.some((c) => c.hidden)).toBe(true);
    expect(courses).toEqual(
      [...expected].sort((a, b) => a.title.localeCompare(b.title, 'ru')),
    );
  });

  it('excludes hidden courses when includeHidden is false', async () => {
    const courses = await fetchCoursesByAuthor('author-1', false);
    expect(courses.every((c) => !c.hidden)).toBe(true);
  });
});

describe('courseApi CRUD mock', () => {
  const createdIds: string[] = [];

  afterEach(() => {
    for (const id of createdIds) {
      const index = mockCourses.findIndex((c) => c.id === id);
      if (index !== -1) mockCourses.splice(index, 1);
    }
    createdIds.length = 0;
  });

  it('fetchCourses hides hidden courses by default', async () => {
    const visible = await fetchCourses(false);
    expect(visible.every((c) => !c.hidden)).toBe(true);
  });

  it('fetchCourses includes hidden when requested', async () => {
    const all = await fetchCourses(true);
    expect(all.some((c) => c.hidden)).toBe(true);
  });

  it('creates and updates a course', async () => {
    const created = await createCourse({
      title: 'Test VKR Course',
      description: 'Desc',
      price: 1000,
      category: 'Программирование',
      authorId: TEST_AUTHOR,
    });
    createdIds.push(created.id);

    expect(created.title).toBe('Test VKR Course');
    expect(created.authorId).toBe(TEST_AUTHOR);

    const updated = await updateCourse(created.id, { title: 'Updated title' });
    expect(updated.title).toBe('Updated title');
  });

  it('setCourseHidden toggles visibility', async () => {
    const created = await createCourse({
      title: 'Hidden test',
      description: 'Desc',
      price: 500,
      category: 'Дизайн',
      authorId: TEST_AUTHOR,
    });
    createdIds.push(created.id);

    const hidden = await setCourseHidden(created.id, true);
    expect(hidden.hidden).toBe(true);

    const published = await setCourseHidden(created.id, false);
    expect(published.hidden).toBe(false);
  });
});
