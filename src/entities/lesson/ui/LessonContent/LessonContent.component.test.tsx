import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Lesson } from '@/entities/lesson/model/types';
import { LessonContent } from './LessonContent';

const baseLesson: Lesson = {
  id: 'l1',
  courseId: 'c1',
  title: 'Lesson',
  content: '',
  order: 1,
};

describe('LessonContent', () => {
  it('renders text and code blocks', () => {
    const lesson: Lesson = {
      ...baseLesson,
      blocks: [
        { type: 'text', body: 'Hello lesson' },
        { type: 'code', language: 'javascript', code: 'const x = 1' },
      ],
    };

    render(<LessonContent lesson={lesson} />);
    expect(screen.getByText('Hello lesson')).toBeInTheDocument();
    expect(screen.getByText('const x = 1')).toBeInTheDocument();
  });

  it('does not render empty quiz options', () => {
    const lesson: Lesson = {
      ...baseLesson,
      blocks: [
        {
          type: 'quiz',
          question: 'Pick one',
          options: ['Answer A', '', 'Answer B'],
          correctIndex: 0,
        },
      ],
    };

    render(<LessonContent lesson={lesson} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(screen.getByText('Answer A')).toBeInTheDocument();
    expect(screen.getByText('Answer B')).toBeInTheDocument();
  });

  it('checks quiz answer and calls onQuizPassed', async () => {
    const user = userEvent.setup();
    const onQuizPassed = vi.fn();
    const lesson: Lesson = {
      ...baseLesson,
      blocks: [
        {
          type: 'quiz',
          question: '2+2?',
          options: ['3', '4'],
          correctIndex: 1,
        },
      ],
    };

    render(<LessonContent lesson={lesson} onQuizPassed={onQuizPassed} />);

    await user.click(screen.getByLabelText('4'));
    await user.click(screen.getByRole('button', { name: /проверить/i }));

    expect(screen.getByText(/верно/i)).toBeInTheDocument();
    expect(onQuizPassed).toHaveBeenCalledWith(true);
  });
});
