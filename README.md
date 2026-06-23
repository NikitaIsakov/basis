# Базис Client

Клиентская часть образовательного маркетплейса Базис (React + TypeScript + FSD).

## Запуск

```bash
npm install
npm run dev
```

Опционально API (json-server):

```bash
npm run api
```

Скопируйте `.env.example` в `.env` и установите `VITE_USE_MOCK=false` для работы с json-server.

## Тесты

```bash
npm test                  # все тесты
npm run test:unit         # unit: API, lib, model
npm run test:component    # component: UI-компоненты
npm run test:integration  # integration: Router, Redux, mocks
npm run test:watch        # watch-режим
```

Суффиксы файлов: `*.unit.test.ts`, `*.component.test.tsx`, `*.integration.test.tsx`.

## Скрипты

```bash
npm run lint      # ESLint
npm run format    # Prettier
npm test                  # Vitest (все)
npm run test:unit         # unit-тесты
npm run test:component    # component-тесты
npm run test:integration  # integration-тесты
```
