import type { Lesson } from '@/entities/lesson/model/types';

/** Дополнительные уроки (+25) и duration для расширения каталога */
export const extraLessons: Lesson[] = [
  {
    id: 'l1-6',
    courseId: '1',
    title: 'Контекст и провайдеры',
    content:
      'Context API передаёт данные через дерево компонентов без prop drilling. Создадим ThemeContext и провайдер для настроек приложения.',
    order: 6,
    durationMinutes: 14,
  },
  {
    id: 'l1-7',
    courseId: '1',
    title: 'Оптимизация рендеров',
    content:
      'React.memo, useMemo и useCallback помогают избежать лишних перерисовок. Разберём, когда оптимизация действительно нужна.',
    order: 7,
    durationMinutes: 16,
  },
  {
    id: 'l2-5',
    courseId: '2',
    title: 'Типизация React-компонентов',
    content:
      'Типизируем FC, props с children, event handlers. Используем ComponentProps и PropsWithChildren.',
    order: 5,
    durationMinutes: 12,
    blocks: [
      {
        type: 'text',
        body: 'TypeScript делает React-компоненты предсказуемыми: props, events и refs получают явные типы.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: "type ButtonProps = {\n  label: string;\n  onClick: () => void;\n};\n\nfunction Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}",
      },
      {
        type: 'quiz',
        question: 'Что даёт типизация props?',
        options: ['Только красивый код', 'Ошибки на этапе компиляции', 'Быстрее загрузку сайта'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'l3-5',
    courseId: '3',
    title: 'Дизайн-системы для e-learning',
    content:
      'Единые токены, компоненты и паттерны ускоряют разработку. Соберём mini design system для SkillPort.',
    order: 5,
    durationMinutes: 15,
  },
  {
    id: 'l4-5',
    courseId: '4',
    title: 'Middleware и DevTools',
    content:
      'Middleware расширяет store логированием и persistance. Подключим Redux DevTools для отладки.',
    order: 5,
    durationMinutes: 11,
  },
  {
    id: 'l5-5',
    courseId: '5',
    title: 'Pinia vs Vuex',
    content:
      'Сравним state-менеджеры во Vue-экосистеме. Pinia — современный выбор для Vue 3.',
    order: 5,
    durationMinutes: 13,
    blocks: [
      {
        type: 'text',
        body: 'Pinia упрощает типизацию и модульность по сравнению с Vuex 4. Рекомендуется для новых Vue 3 проектов.',
      },
      {
        type: 'quiz',
        question: 'Какой store рекомендован для Vue 3?',
        options: ['Vuex 3', 'Pinia', 'MobX only'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'l6-4',
    courseId: '6',
    title: 'Прототипирование форм',
    content:
      'Соберём форму регистрации с валидацией и состояниями ошибок в Figma.',
    order: 4,
    durationMinutes: 10,
  },
  {
    id: 'l7-5',
    courseId: '7',
    title: 'Локальное SEO',
    content:
      'Яндекс и Google для региональных образовательных проектов. Карты, отзывы, локальные landing.',
    order: 5,
    durationMinutes: 12,
  },
  {
    id: 'l8-6',
    courseId: '8',
    title: 'Аутентификация JWT',
    content:
      'Реализуем login endpoint, выдачу токена и middleware проверки для защищённых маршрутов.',
    order: 6,
    durationMinutes: 18,
    blocks: [
      {
        type: 'text',
        body: 'JWT хранит payload в подписанном токене. Access token передаётся в Authorization header.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: "app.use('/api', (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  next();\n});",
      },
    ],
  },
  {
    id: 'l9-5',
    courseId: '9',
    title: 'A/B тестирование UI',
    content:
      'Как проверять гипотезы по конверсии checkout и карточек товаров на реальном трафике.',
    order: 5,
    durationMinutes: 14,
  },
  {
    id: 'l10-4',
    courseId: '10',
    title: 'Юридические аспекты',
    content:
      'Оферта, политика конфиденциности и обработка персональных данных для онлайн-школ.',
    order: 4,
    durationMinutes: 9,
  },
  {
    id: 'l1-8',
    courseId: '1',
    title: 'Тестирование компонентов',
    content:
      'Vitest и Testing Library для unit-тестов React. Покрываем CourseCard и формы.',
    order: 8,
    durationMinutes: 17,
  },
  {
    id: 'l2-6',
    courseId: '2',
    title: 'Строгий режим TypeScript',
    content:
      'strict, noImplicitAny, strictNullChecks — настраиваем tsconfig для production-проектов.',
    order: 6,
    durationMinutes: 10,
  },
  {
    id: 'l3-6',
    courseId: '3',
    title: 'Accessibility в e-learning',
    content:
      'WCAG, контраст, keyboard navigation и screen readers для образовательных платформ.',
    order: 6,
    durationMinutes: 13,
  },
  {
    id: 'l4-6',
    courseId: '4',
    title: 'Нормализация state',
    content:
      'Entity adapters и нормализованные коллекции для курсов и уроков в Redux store.',
    order: 6,
    durationMinutes: 15,
  },
  {
    id: 'l5-6',
    courseId: '5',
    title: 'Тестирование Vue-компонентов',
    content:
      'Vitest + @vue/test-utils. Тестируем composables и компоненты с props/emits.',
    order: 6,
    durationMinutes: 14,
  },
  {
    id: 'l6-5',
    courseId: '6',
    title: 'Design handoff',
    content:
      'Экспорт assets, спецификации отступов и документация для frontend-команды.',
    order: 5,
    durationMinutes: 11,
  },
  {
    id: 'l7-6',
    courseId: '7',
    title: 'Email-маркетинг курсов',
    content:
      'Цепочки писем: welcome, напоминание о прогрессе, upsell следующего курса.',
    order: 6,
    durationMinutes: 10,
  },
  {
    id: 'l8-7',
    courseId: '8',
    title: 'WebSockets basics',
    content:
      'Real-time уведомления через ws. Когда нужны сокеты в образовательной платформе.',
    order: 7,
    durationMinutes: 16,
  },
  {
    id: 'l9-6',
    courseId: '9',
    title: 'Dark mode patterns',
    content:
      'Переключение темы, CSS variables и сохранение предпочтений пользователя.',
    order: 6,
    durationMinutes: 12,
  },
  {
    id: 'l10-5',
    courseId: '10',
    title: 'Финансовая модель курса',
    content:
      'Ценообразование, break-even point и unit-экономика онлайн-курса.',
    order: 5,
    durationMinutes: 11,
  },
  {
    id: 'l2-7',
    courseId: '2',
    title: 'Интеграция TS в CI',
    content:
      'tsc --noEmit в pipeline, type-aware ESLint и pre-commit hooks.',
    order: 7,
    durationMinutes: 8,
  },
  {
    id: 'l5-7',
    courseId: '5',
    title: 'Сборка и деплой Vue SPA',
    content:
      'Vite build, environment variables и деплой на static hosting.',
    order: 7,
    durationMinutes: 15,
  },
  {
    id: 'l6-6',
    courseId: '6',
    title: 'Анимация в UI',
    content:
      'Micro-interactions, transition в Figma и handoff анимаций в CSS.',
    order: 6,
    durationMinutes: 12,
  },
  {
    id: 'l7-7',
    courseId: '7',
    title: 'Контент для соцсетей',
    content:
      'Продвижение курсов через Telegram, VK и короткие video-форматы.',
    order: 7,
    durationMinutes: 9,
  },
  {
    id: 'l8-8',
    courseId: '8',
    title: 'Мониторинг и логи',
    content:
      'Winston, structured logging и health endpoints для Node-сервисов.',
    order: 8,
    durationMinutes: 13,
  },
];

export function applyLessonDurations(lessons: Lesson[]): Lesson[] {
  return lessons.map((lesson) => ({
    ...lesson,
    durationMinutes:
      lesson.durationMinutes ?? 8 + ((lesson.order * 5) % 13),
  }));
}
