import type { CourseLevel } from '@/entities/course/model/types';

interface CourseMeta {
  level: CourseLevel;
  durationHours: number;
  studentsCount: number;
  learningOutcomes: string[];
  requirements: string[];
}

export const courseMetaById: Record<string, CourseMeta> = {
  '1': {
    level: 'beginner',
    durationHours: 8,
    studentsCount: 1240,
    learningOutcomes: [
      'Создавать компоненты React',
      'Использовать хуки useState и useEffect',
      'Настраивать маршрутизацию в SPA',
    ],
    requirements: ['Базовый HTML, CSS и JavaScript'],
  },
  '2': {
    level: 'intermediate',
    durationHours: 10,
    studentsCount: 890,
    learningOutcomes: [
      'Типизировать props и state',
      'Применять generics и utility types',
      'Строить типобезопасные API-слои',
    ],
    requirements: ['Опыт JavaScript', 'Знакомство с React желательно'],
  },
  '3': {
    level: 'beginner',
    durationHours: 6,
    studentsCount: 560,
    learningOutcomes: [
      'Проводить user research',
      'Создавать wireframes и прототипы',
      'Тестировать usability сценариев',
    ],
    requirements: ['Интерес к дизайну интерфейсов'],
  },
  '4': {
    level: 'intermediate',
    durationHours: 7,
    studentsCount: 720,
    learningOutcomes: [
      'Создавать слайсы Redux Toolkit',
      'Работать с RTK Query',
      'Обрабатывать async-сценарии',
    ],
    requirements: ['React на базовом уровне'],
  },
  '5': {
    level: 'intermediate',
    durationHours: 9,
    studentsCount: 430,
    learningOutcomes: [
      'Использовать Composition API',
      'Создавать composables',
      'Настраивать Vue Router',
    ],
    requirements: ['JavaScript ES6+', 'Опыт HTML/CSS'],
  },
  '6': {
    level: 'beginner',
    durationHours: 5,
    studentsCount: 980,
    learningOutcomes: [
      'Работать в Figma с auto-layout',
      'Собирать UI-kit компонентов',
      'Готовить handoff для разработки',
    ],
    requirements: ['Нет опыта в дизайне — подойдёт'],
  },
  '7': {
    level: 'beginner',
    durationHours: 6,
    studentsCount: 310,
    learningOutcomes: [
      'Оптимизировать страницы под SEO',
      'Планировать контент-стратегию',
      'Настраивать аналитику',
    ],
    requirements: ['Базовое понимание веб-сайтов'],
  },
  '8': {
    level: 'intermediate',
    durationHours: 12,
    studentsCount: 650,
    learningOutcomes: [
      'Создавать REST API на Express',
      'Работать с файловой системой',
      'Деплоить Node-приложения',
    ],
    requirements: ['JavaScript', 'Базовый HTTP'],
  },
  '9': {
    level: 'intermediate',
    durationHours: 7,
    studentsCount: 540,
    learningOutcomes: [
      'Проектировать карточки товаров',
      'Оптимизировать checkout flow',
      'Адаптировать UI под mobile',
    ],
    requirements: ['Базовый UX/UI'],
  },
  '10': {
    level: 'beginner',
    durationHours: 5,
    studentsCount: 280,
    learningOutcomes: [
      'Планировать запуск курса',
      'Формировать команду',
      'Отслеживать метрики продукта',
    ],
    requirements: ['Интерес к управлению проектами'],
  },
  '11': {
    level: 'beginner',
    durationHours: 2,
    studentsCount: 12,
    learningOutcomes: ['Пример скрытого курса'],
    requirements: [],
  },
  '12': {
    level: 'intermediate',
    durationHours: 4,
    studentsCount: 0,
    learningOutcomes: ['GraphQL basics', 'Схемы и queries'],
    requirements: ['REST API опыт'],
  },
};
