# Скриншоты для пояснительной записки (ВКР)

Папка для иллюстраций раздела «Реализация» и «Тестирование интерфейса».

## Рекомендуемый набор

| Файл | Страница | Viewport |
|------|----------|----------|
| `01-home-desktop.png` | `/` | desktop 1280px |
| `02-home-mobile.png` | `/` | mobile 375px |
| `03-catalog-mobile.png` | `/catalog` | mobile |
| `04-course-mobile.png` | `/courses/:id` | mobile |
| `05-author-courses-mobile.png` | `/author/courses` | mobile |
| `06-edit-course-lessons-mobile.png` | `/author/courses/:id/edit?tab=lessons` | mobile |
| `07-lesson-quiz-mobile.png` | `/courses/:id/lessons/:lessonId` | mobile |
| `08-admin-desktop.png` | `/admin` | desktop |

## Как сделать

1. `npm run dev`
2. Chrome DevTools → Toggle device toolbar
3. Для mobile: iPhone SE (375×667) или аналог
4. Для desktop: Responsive 1280×800
5. Сохранить PNG в эту папку

Демо-аккаунты — см. [README](../README.md).
