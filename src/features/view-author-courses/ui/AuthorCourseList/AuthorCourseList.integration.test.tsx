import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthorCourseList } from './AuthorCourseList';

vi.mock('@/entities/course/api/courseRtkApi', () => ({
  useGetCoursesByAuthorQuery: vi.fn(),
}));

import { useGetCoursesByAuthorQuery } from '@/entities/course/api/courseRtkApi';

const mockedQuery = vi.mocked(useGetCoursesByAuthorQuery);

const sampleCourse = {
  id: '99',
  title: 'Hidden course',
  description: 'Desc',
  price: 3000,
  category: 'Программирование',
  authorId: 'author-1',
  rating: 4.5,
  hidden: true,
  level: 'beginner' as const,
  durationHours: 5,
  studentsCount: 10,
  learningOutcomes: ['Skill'],
  requirements: [],
};

describe('AuthorCourseList', () => {
  it('shows empty state with create link', () => {
    mockedQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCoursesByAuthorQuery>);

    render(
      <MemoryRouter>
        <AuthorCourseList authorId="author-1" />
      </MemoryRouter>,
    );

    expect(screen.getByText('У вас пока нет курсов')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /создать первый курс/i })).toHaveAttribute(
      'href',
      '/author/courses/new',
    );
  });

  it('shows hidden badge and edit links', () => {
    mockedQuery.mockReturnValue({
      data: [sampleCourse],
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCoursesByAuthorQuery>);

    render(
      <MemoryRouter>
        <AuthorCourseList authorId="author-1" />
      </MemoryRouter>,
    );

    expect(screen.getByText('Hidden course')).toBeInTheDocument();
    expect(screen.getByText('Скрыт (модерация)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /редактировать/i })).toHaveAttribute(
      'href',
      '/author/courses/99/edit',
    );
    expect(screen.getByRole('link', { name: /уроки/i })).toHaveAttribute(
      'href',
      '/author/courses/99/edit?tab=lessons',
    );
  });
});
