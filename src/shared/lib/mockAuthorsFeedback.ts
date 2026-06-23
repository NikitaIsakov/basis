import type { AuthorProfile } from '@/entities/author/model/types';
import type { CourseFeedback } from '@/entities/feedback/model/types';

export const mockAuthors: AuthorProfile[] = [
  {
    id: 'author-1',
    name: 'Мария Автор',
    bio: 'Frontend-разработчик с 8-летним опытом. Ведёт курсы по React, TypeScript и Redux. Работала в продуктовых командах edtech-проектов.',
    expertise: ['React', 'TypeScript', 'Redux', 'Node.js'],
    coursesCount: 6,
  },
  {
    id: 'author-2',
    name: 'Олег Дизайнер',
    bio: 'UX/UI-дизайнер и продуктовый исследователь. Специализируется на образовательных платформах и e-commerce интерфейсах.',
    expertise: ['UX Research', 'Figma', 'UI Design', 'SEO'],
    coursesCount: 5,
  },
];

export const mockFeedback: CourseFeedback[] = [
  {
    id: 'fb-1',
    courseId: '1',
    courseTitle: 'Основы React',
    studentId: 'user-1',
    studentName: 'Иван Студент',
    authorId: 'author-1',
    message: 'Не совсем понял разницу между props и state. Можете привести ещё один пример?',
    createdAt: '2026-05-20T10:30:00.000Z',
    reply:
      'Props передаются извне и неизменны внутри компонента, state — локальные данные компонента. Пример: props — title карточки курса, state — открыта ли форма записи.',
    repliedAt: '2026-05-20T14:15:00.000Z',
  },
  {
    id: 'fb-2',
    courseId: '3',
    courseTitle: 'UX образовательных платформ',
    studentId: 'user-1',
    studentName: 'Иван Студент',
    authorId: 'author-2',
    message: 'Как лучше тестировать прототип каталога курсов с пользователями?',
    createdAt: '2026-05-22T09:00:00.000Z',
  },
  {
    id: 'fb-3',
    courseId: '2',
    courseTitle: 'TypeScript для фронтенда',
    studentId: 'user-2',
    studentName: 'Анна Петрова',
    authorId: 'author-1',
    message: 'Когда лучше использовать interface, а когда type?',
    createdAt: '2026-05-25T11:45:00.000Z',
    reply:
      'Для объектов и публичных контрактов чаще interface (удобно расширять). Для union, tuple и utility-комбинаций — type.',
    repliedAt: '2026-05-25T16:00:00.000Z',
  },
  {
    id: 'fb-4',
    courseId: '5',
    courseTitle: 'Vue 3: Composition API',
    studentId: 'user-2',
    studentName: 'Анна Петрова',
    authorId: 'author-2',
    message: 'Есть ли в курсе сравнение composables с React hooks?',
    createdAt: '2026-06-01T08:20:00.000Z',
  },
];
