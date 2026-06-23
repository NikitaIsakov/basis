export const COURSE_CATEGORIES = [
  'Программирование',
  'Дизайн',
  'Маркетинг',
  'Бизнес',
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export const COURSE_LEVELS = [
  { value: 'beginner' as const, label: 'Начальный' },
  { value: 'intermediate' as const, label: 'Средний' },
  { value: 'advanced' as const, label: 'Продвинутый' },
];
