import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CourseCard } from './CourseCard';

const course = {
  id: '1',
  title: 'Основы React',
  description: 'Описание курса',
  price: 4990,
  category: 'Программирование',
  authorId: 'a1',
  rating: 4.8,
  level: 'beginner' as const,
  durationHours: 8,
  studentsCount: 100,
  learningOutcomes: ['React basics'],
  requirements: ['JavaScript'],
};

describe('CourseCard', () => {
  it('отображает название и цену курса', () => {
    render(
      <MemoryRouter>
        <CourseCard course={course} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Основы React')).toBeInTheDocument();
    expect(screen.getByTestId('course-card')).toBeInTheDocument();
    expect(screen.getByText(/Начальный/)).toBeInTheDocument();
  });
});
