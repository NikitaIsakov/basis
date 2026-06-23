import type { Course } from '@/entities/course/model/types';
import type { Lesson } from '@/entities/lesson/model/types';
import type { User } from '@/shared/types/roles';
import { courseMetaById } from './mockCourseMeta';
import { applyLessonDurations, extraLessons } from './mockLessonsExtra';
import { mockAuthors, mockFeedback } from './mockAuthorsFeedback';

export { mockAuthors, mockFeedback };

const baseCourses: Omit<
  Course,
  'level' | 'durationHours' | 'studentsCount' | 'learningOutcomes' | 'requirements'
>[] = [
  {
    id: '1',
    title: 'Основы React',
    description: 'Компоненты, хуки и маршрутизация в современных SPA.',
    price: 4990,
    category: 'Программирование',
    authorId: 'author-1',
    rating: 4.8,
    hidden: false,
  },
  {
    id: '2',
    title: 'TypeScript для фронтенда',
    description: 'Типизация, дженерики и практики в крупных проектах.',
    price: 5990,
    category: 'Программирование',
    authorId: 'author-1',
    rating: 4.6,
    hidden: false,
  },
  {
    id: '3',
    title: 'UX образовательных платформ',
    description: 'Проектирование удобных интерфейсов для e-learning.',
    price: 3490,
    category: 'Дизайн',
    authorId: 'author-2',
    rating: 4.9,
    hidden: false,
  },
  {
    id: '4',
    title: 'Redux Toolkit на практике',
    description: 'Слайсы, RTK Query и асинхронные сценарии.',
    price: 4490,
    category: 'Программирование',
    authorId: 'author-1',
    rating: 4.7,
    hidden: false,
  },
  {
    id: '5',
    title: 'Vue 3: Composition API',
    description: 'Реактивность, composables и сборка SPA на Vue 3.',
    price: 5490,
    category: 'Программирование',
    authorId: 'author-2',
    rating: 4.5,
    hidden: false,
  },
  {
    id: '6',
    title: 'Figma для начинающих',
    description: 'От макета до handoff: компоненты, auto-layout и стили.',
    price: 2990,
    category: 'Дизайн',
    authorId: 'author-2',
    rating: 4.7,
    hidden: false,
  },
  {
    id: '7',
    title: 'SEO для образовательных проектов',
    description: 'Продвижение курсов в поиске: семантика, контент и аналитика.',
    price: 3990,
    category: 'Маркетинг',
    authorId: 'author-2',
    rating: 4.4,
    hidden: false,
  },
  {
    id: '8',
    title: 'Основы Node.js',
    description: 'HTTP-сервер, Express, работа с файлами и REST API.',
    price: 6490,
    category: 'Программирование',
    authorId: 'author-1',
    rating: 4.6,
    hidden: false,
  },
  {
    id: '9',
    title: 'UI/UX паттерны e-commerce',
    description: 'Карточки товаров, корзина, checkout и мобильные сценарии.',
    price: 4290,
    category: 'Дизайн',
    authorId: 'author-2',
    rating: 4.8,
    hidden: false,
  },
  {
    id: '10',
    title: 'Управление образовательным проектом',
    description: 'Планирование, команда, метрики и запуск онлайн-курса.',
    price: 3790,
    category: 'Бизнес',
    authorId: 'author-1',
    rating: 4.3,
    hidden: false,
  },
  {
    id: '11',
    title: 'Курс с сомнительным контентом',
    description: 'Пример курса, скрытого администратором из публичного каталога.',
    price: 1990,
    category: 'Маркетинг',
    authorId: 'author-1',
    rating: 2.1,
    hidden: true,
  },
  {
    id: '12',
    title: 'Черновик: GraphQL Basics',
    description: 'Неопубликованный черновик: схемы, queries и mutations.',
    price: 5190,
    category: 'Программирование',
    authorId: 'author-1',
    rating: 0,
    hidden: true,
  },
];

export const mockCourses: Course[] = baseCourses.map((course) => ({
  ...course,
  ...courseMetaById[course.id],
}));

const baseLessons: Lesson[] = [
  {
    id: 'l1',
    courseId: '1',
    title: 'Введение в React',
    content:
      'React — библиотека для построения пользовательских интерфейсов.',
    order: 1,
    blocks: [
      {
        type: 'text',
        body: 'React — библиотека для построения пользовательских интерфейсов. Она использует декларативный подход: вы описываете, как UI должен выглядеть для текущего состояния данных.',
      },
      {
        type: 'code',
        language: 'jsx',
        code: "import { createRoot } from 'react-dom/client';\n\nfunction App() {\n  return <h1>Привет, React!</h1>;\n}\n\ncreateRoot(document.getElementById('root')!).render(<App />);",
      },
      {
        type: 'checklist',
        items: [
          'Установить Node.js и создать проект через Vite',
          'Запустить dev-сервер и открыть приложение в браузере',
          'Изменить текст в App и убедиться, что UI обновился',
        ],
      },
      {
        type: 'quiz',
        question: 'Что делает React при изменении state?',
        options: [
          'Перезагружает всю страницу',
          'Перерисовывает только затронутые части UI',
          'Отправляет форму на сервер',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'l2',
    courseId: '1',
    title: 'Компоненты и props',
    content:
      'Компоненты позволяют разбивать UI на независимые части. Props передают данные от родителя к дочернему компоненту и делают интерфейс переиспользуемым. На практике создадим несколько компонентов и научимся типизировать props в TypeScript.',
    order: 2,
  },
  {
    id: 'l1-3',
    courseId: '1',
    title: 'Состояние и хуки useState',
    content:
      'Локальное состояние компонента хранится через хук useState. Изменение state инициирует повторный рендер и обновление UI. Рассмотрим правила хуков и типичные ошибки при работе с объектами и массивами в state.',
    order: 3,
  },
  {
    id: 'l1-4',
    courseId: '1',
    title: 'useEffect и побочные эффекты',
    content:
      'Хук useEffect связывает компонент с внешним миром: запросы к API, подписки и таймеры. Важно правильно указывать массив зависимостей и функцию очистки. На примере загрузим список курсов при монтировании компонента.',
    order: 4,
  },
  {
    id: 'l1-5',
    courseId: '1',
    title: 'Маршрутизация в React Router',
    content:
      'React Router позволяет строить многостраничные SPA без перезагрузки документа. Настроим базовые маршруты, вложенные layout и навигацию через Link. Обсудим lazy-loading страниц для оптимизации бандла.',
    order: 5,
  },
  {
    id: 'l3',
    courseId: '2',
    title: 'Базовые типы TypeScript',
    content:
      'Статическая типизация помогает находить ошибки на этапе компиляции. Изучим примитивы, union-типы, литералы и type aliases. Сравним подход TypeScript с PropTypes в React-компонентах.',
    order: 1,
  },
  {
    id: 'l2-2',
    courseId: '2',
    title: 'Интерфейсы и type aliases',
    content:
      'interface и type решают схожие задачи, но имеют различия в расширении и объединении. Научимся описывать формы данных API и DTO для создания курсов. Рассмотрим optional и readonly модификаторы.',
    order: 2,
  },
  {
    id: 'l2-3',
    courseId: '2',
    title: 'Generics на практике',
    content:
      'Дженерики делают функции и компоненты универсальными без потери типобезопасности. Применим их к хукам, спискам и обёрткам над fetch. Разберём ограничения extends и вывод типов компилятором.',
    order: 3,
  },
  {
    id: 'l2-4',
    courseId: '2',
    title: 'Utility Types',
    content:
      'Partial, Pick, Omit и Record ускоряют работу с большими моделями. С их помощью строим типы для форм редактирования и ответов API. Покажем, как комбинировать utility types для сложных сценариев.',
    order: 4,
  },
  {
    id: 'l3-1',
    courseId: '3',
    title: 'Введение в UX',
    content: 'UX — это опыт пользователя при взаимодействии с продуктом.',
    order: 1,
    blocks: [
      {
        type: 'text',
        body: 'UX — это опыт пользователя при взаимодействии с продуктом. Для образовательных платформ важны ясная навигация, прогресс обучения и минимум когнитивной нагрузки.',
      },
      {
        type: 'checklist',
        items: [
          'Определить целевую аудиторию платформы',
          'Составить карту ключевых пользовательских сценариев',
          'Проверить, что каждый сценарий укладывается в 3 клика',
        ],
      },
      {
        type: 'quiz',
        question: 'Что важнее всего для UX образовательной платформы?',
        options: [
          'Максимум анимаций на главной',
          'Понятный прогресс обучения',
          'Скрытый каталог курсов',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'l3-2',
    courseId: '3',
    title: 'User Research',
    content:
      'Исследования помогают принимать решения на основе данных, а не предположений. Проведём интервью со студентами и составим персоны. Научимся формулировать гипотезы и проверять их быстрыми прототипами.',
    order: 2,
  },
  {
    id: 'l3-3',
    courseId: '3',
    title: 'Wireframes и прототипы',
    content:
      'Wireframe фиксирует структуру экрана без визуального polish. Интерактивный прототип позволяет протестировать flow до разработки. Соберём прототип каталога курсов и страницы урока в Figma.',
    order: 3,
  },
  {
    id: 'l3-4',
    courseId: '3',
    title: 'Usability-тестирование',
    content:
      'Модерируемое тестирование выявляет проблемы там, где команда их не замечает. Составим сценарии задач: найти курс, записаться, пройти урок. Зафиксируем метрики успеха и список улучшений для backlog.',
    order: 4,
  },
  {
    id: 'l4-1',
    courseId: '4',
    title: 'Store и reducers',
    content:
      'Redux хранит глобальное состояние в едином store. Reducer — чистая функция (state, action) => newState. Разберём однонаправленный поток данных и зачем он полезен в крупных React-приложениях.',
    order: 1,
  },
  {
    id: 'l4-2',
    courseId: '4',
    title: 'createSlice',
    content:
      'Redux Toolkit упрощает создание слайсов с reducers и actions. Immer под капотом позволяет писать «мутирующий» код безопасно. Создадим sessionSlice для авторизации и записи на курсы.',
    order: 2,
  },
  {
    id: 'l4-3',
    courseId: '4',
    title: 'RTK Query basics',
    content: 'RTK Query кеширует серверные данные и управляет loading/error состояниями.',
    order: 3,
    blocks: [
      {
        type: 'text',
        body: 'RTK Query кеширует серверные данные и управляет loading/error состояниями. Endpoints описываются декларативно, а кеш инвалидируется через tags.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: "export const courseApi = createApi({\n  reducerPath: 'courseApi',\n  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),\n  endpoints: (builder) => ({\n    getCourses: builder.query<Course[], void>({\n      query: () => '/courses',\n    }),\n  }),\n});",
      },
      {
        type: 'quiz',
        question: 'За что отвечает RTK Query?',
        options: [
          'Только за роутинг в приложении',
          'За кеширование и загрузку серверных данных',
          'За стилизацию компонентов',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'l4-4',
    courseId: '4',
    title: 'Async thunks',
    content:
      'createAsyncThunk подходит для сложных сценариев вне RTK Query. Обработаем pending, fulfilled и rejected состояния в extraReducers. Покажем, когда thunk предпочтительнее query endpoint.',
    order: 4,
  },
  {
    id: 'l5-1',
    courseId: '5',
    title: 'Reactivity в Vue 3',
    content:
      'Vue 3 использует Proxy для отслеживания изменений данных. ref и reactive — два способа объявить реактивное состояние. Сравним ментальную модель Vue с React hooks на простом счётчике.',
    order: 1,
  },
  {
    id: 'l5-2',
    courseId: '5',
    title: 'Composition API',
    content:
      'setup() и script setup группируют логику по фичам, а не по options. Composables переиспользуют stateful-логику между компонентами. Вынесем загрузку курсов в useCourses composable.',
    order: 2,
  },
  {
    id: 'l5-3',
    courseId: '5',
    title: 'Компоненты и props',
    content:
      'defineProps и defineEmits типизируют контракт компонента. Slots позволяют передавать разметку внутрь дочерних элементов. Соберём карточку курса с именованными слотами для цены и рейтинга.',
    order: 3,
  },
  {
    id: 'l5-4',
    courseId: '5',
    title: 'Vue Router',
    content:
      'Маршруты описываются декларативно, navigation guards защищают приватные страницы. Настроим lazy routes и meta-поля для ролей user и admin. Интегрируем router с Pinia для проверки сессии.',
    order: 4,
  },
  {
    id: 'l6-1',
    courseId: '6',
    title: 'Интерфейс Figma',
    content:
      'Frames, groups и constraints — основа аккуратных макетов. Разберём панели layers, properties и shortcuts для быстрой работы. Создадим файл дизайн-системы для образовательного маркетплейса.',
    order: 1,
  },
  {
    id: 'l6-2',
    courseId: '6',
    title: 'Auto Layout',
    content:
      'Auto Layout автоматически адаптирует блоки при изменении контента. Настроим карточку курса с отступами, gap и выравниванием. Покажем responsive-поведение при длинных заголовках.',
    order: 2,
  },
  {
    id: 'l6-3',
    courseId: '6',
    title: 'Компоненты и variants',
    content:
      'Компоненты в Figma синхронизируются между экранами через instances. Variants описывают состояния: default, hover, disabled. Соберём библиотеку кнопок и полей ввода для формы регистрации.',
    order: 3,
  },
  {
    id: 'l7-1',
    courseId: '7',
    title: 'Основы SEO',
    content:
      'Поисковая оптимизация начинается с релевантного контента и технически корректной разметки. Разберём title, description, заголовки H1–H3 и внутреннюю перелinkовку. Объясним разницу между SEO для лендинга и каталога курсов.',
    order: 1,
  },
  {
    id: 'l7-2',
    courseId: '7',
    title: 'Семантическая вёрстка',
    content:
      'Теги article, section и nav помогают поисковикам понимать структуру страницы. Добавим schema.org разметку Course для карточек в каталоге. Проверим доступность и Core Web Vitals.',
    order: 2,
  },
  {
    id: 'l7-3',
    courseId: '7',
    title: 'Контент-стратегия',
    content:
      'Образовательные проекты продвигаются через экспертные статьи и кейсы выпускников. Составим контент-план на квартал и кластер ключевых запросов. Свяжем блог с карточками курсов через CTA.',
    order: 3,
  },
  {
    id: 'l7-4',
    courseId: '7',
    title: 'Аналитика и метрики',
    content:
      'Google Search Console и Яндекс.Вебмастер показывают запросы и позиции. Настроим цели в аналитике: регистрация, запись на курс, оплата. Интерпретируем CTR сниппетов и дорабатываем meta-теги.',
    order: 4,
  },
  {
    id: 'l8-1',
    courseId: '8',
    title: 'Node.js и npm',
    content:
      'Node.js выполняет JavaScript вне браузера на движке V8. npm управляет зависимостями и scripts в package.json. Инициализируем проект и разберём модули CommonJS и ESM.',
    order: 1,
  },
  {
    id: 'l8-2',
    courseId: '8',
    title: 'HTTP и Express',
    content:
      'Express — минималистичный фреймворк для REST API. Настроим маршруты GET/POST, middleware для JSON и обработку ошибок. Реализуем endpoint списка курсов с фильтрацией по категории.',
    order: 2,
  },
  {
    id: 'l8-3',
    courseId: '8',
    title: 'Работа с файлами',
    content:
      'fs/promises позволяет читать и записывать JSON-базу для mock API. Добавим валидацию входных данных перед сохранением. Обсудим race conditions при параллельных запросах.',
    order: 3,
  },
  {
    id: 'l8-4',
    courseId: '8',
    title: 'REST API design',
    content:
      'Хороший API предсказуем: ресурсы, коды ответов, пагинация. Спроектируем CRUD для courses и lessons. Документируем контракт в OpenAPI для фронтенд-команды.',
    order: 4,
  },
  {
    id: 'l8-5',
    courseId: '8',
    title: 'Деплой и окружение',
    content:
      'Переменные окружения хранят секреты и URL баз данных. Соберём Docker-образ Node-приложения и опишем healthcheck. Кратко рассмотрим serverless-альтернативы для учебных проектов.',
    order: 5,
  },
  {
    id: 'l9-1',
    courseId: '9',
    title: 'Карточка товара',
    content:
      'Карточка должна отвечать на вопросы: что это, сколько стоит, почему доверять. Покажем фото, цену, рейтинг и CTA без перегрузки. Разберём паттерны для desktop и mobile.',
    order: 1,
  },
  {
    id: 'l9-2',
    courseId: '9',
    title: 'Корзина и checkout',
    content:
      'Корзина суммирует выбор пользователя и минимизирует шаги до оплаты. Guest checkout снижает трение, сохранение корзины — возвращает пользователя. Спроектируем flow для покупки нескольких курсов.',
    order: 2,
  },
  {
    id: 'l9-3',
    courseId: '9',
    title: 'Фильтры и сортировка',
    content:
      'Фильтры по категории и цене ускоряют поиск в большом каталоге. Сортировка по рейтингу и новизне должна быть очевидной. Добавим chips активных фильтров и кнопку сброса.',
    order: 3,
  },
  {
    id: 'l9-4',
    courseId: '9',
    title: 'Мобильные паттерны',
    content:
      'На мобильных важны большие touch-цели и sticky CTA. Bottom sheet подходит для фильтров, swipe — для галереи. Проверим макет на типичных breakpoints 360px и 768px.',
    order: 4,
  },
  {
    id: 'l10-1',
    courseId: '10',
    title: 'Планирование запуска',
    content:
      'Запуск курса начинается с целей, аудитории и MVP программы. Составим roadmap на 8 недель: контент, платформа, маркетинг. Оценим риски и ресурсы команды.',
    order: 1,
  },
  {
    id: 'l10-2',
    courseId: '10',
    title: 'Команда и роли',
    content:
      'Минимальная команда: автор, методист, монтажёр, маркетолог. RACI-матрица проясняет ответственность. Настроим процессы ревью материалов и релизов модулей.',
    order: 2,
  },
  {
    id: 'l10-3',
    courseId: '10',
    title: 'Метрики успеха',
    content:
      'Completion rate, NPS и LTV студента показывают здоровье продукта. Определим north star metric для EdMarket-подобной платформы. Настроим дашборд для еженедельного review.',
    order: 3,
  },
  {
    id: 'l11-1',
    courseId: '11',
    title: 'Сомнительные практики продвижения',
    content:
      'Учебный пример того, как не стоит продвигать курсы: спам, clickbait и пустые обещания. Курс скрыт модератором и не отображается в публичном каталоге.',
    order: 1,
  },
  {
    id: 'l11-2',
    courseId: '11',
    title: 'Почему модерация важна',
    content:
      'Платформа несёт ответственность за качество контента в каталоге. Администратор может скрыть курс до исправления нарушений. Рассмотрим чеклист модерации для авторов.',
    order: 2,
  },
  {
    id: 'l12-1',
    courseId: '12',
    title: 'GraphQL vs REST',
    content:
      'GraphQL позволяет клиенту запрашивать только нужные поля одним запросом. Сравним с REST-подходом EdMarket на json-server. Обсудим, когда GraphQL оправдан в образовательных проектах.',
    order: 1,
  },
  {
    id: 'l12-2',
    courseId: '12',
    title: 'Схема и типы',
    content:
      'SDL описывает типы Query, Mutation и связи между сущностями Course и Lesson. Настроим Apollo Server с in-memory резолверами. Черновик курса пока скрыт от студентов.',
    order: 2,
  },
  {
    id: 'l12-3',
    courseId: '12',
    title: 'Queries и mutations',
    content:
      'Query fetchCourses возвращает список с фильтрами, mutation enrollCourse обновляет запись студента. Покажем обработку ошибок и авторизацию по ролям на уровне резолверов.',
    order: 3,
  },
];

export const mockLessons: Lesson[] = applyLessonDurations([
  ...baseLessons,
  ...extraLessons,
]);

export const mockUsers: (User & { password: string })[] = [
  {
    id: 'user-1',
    email: 'student@mail.ru',
    password: '123456',
    name: 'Иван Студент',
    role: 'user',
    enrolledCourseIds: ['1', '3'],
    completedLessonIds: ['l1', 'l2'],
  },
  {
    id: 'user-2',
    email: 'anna@mail.ru',
    password: '123456',
    name: 'Анна Петрова',
    role: 'user',
    enrolledCourseIds: ['2', '5'],
    completedLessonIds: ['l3'],
  },
  {
    id: 'author-1',
    email: 'author@mail.ru',
    password: '123456',
    name: 'Мария Автор',
    role: 'author',
    enrolledCourseIds: [],
    completedLessonIds: [],
  },
  {
    id: 'author-2',
    email: 'designer@mail.ru',
    password: '123456',
    name: 'Олег Дизайнер',
    role: 'author',
    enrolledCourseIds: [],
    completedLessonIds: [],
  },
  {
    id: 'admin-1',
    email: 'admin@mail.ru',
    password: '123456',
    name: 'Админ Системы',
    role: 'admin',
    enrolledCourseIds: [],
    completedLessonIds: [],
  },
];
