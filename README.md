# NORDHAUS — construction company demo website

Demo-сайт строительной компании в Риге. Сделан как пример для реального
владельца строительной фирмы — не учебный шаблон и не типовой
AI-landing: без одинаковых rounded-карточек, без градиентов, без
бессмысленных иконок. Визуальный язык построен на архитектурной
черчёжной эстетике (size-линии, blueprint-сетка, авторская графика вместо
стоковых фото).

## Стек

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (тема в `globals.css`, без `tailwind.config`)
- Шрифт **Archivo Variable** (`@fontsource-variable/archivo`) — один
  шрифт на весь сайт, с осями *weight* и *width*: обычный текст и
  «растянутые» display-числа/заголовки получены из одного файла, без
  второго шрифта.
- Ноль внешних UI-библиотек и ноль стоковых фото. Вся графика (дом с
  размерными линиями в hero, иконки услуг, паттерны проектов,
  текстуры before/after) — рукописные SVG-компоненты в
  `src/components/Graphics.tsx`.

## Почему без фотографий

Настоящих фото объектов NORDHAUS, конечно, нет — это демо. Вместо того
чтобы вставлять случайные стоковые фотографии домов (что выглядело бы
типично и создавало бы вопросы по лицензии при показе клиенту), сайт
использует авторскую «чертёжную» графику: отрисовку дома с размерными
линиями, абстрактные паттерны на карточках проектов, текстуры
before/after. Это сильнее держит стиль «серьёзного архитектурного
бюро» и на реальном проекте меняется на фотографии объекта за минуты —
просто подставьте `<img>`/`next/image` вместо компонентов из
`Graphics.tsx`.

## Быстрый старт

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

```bash
npm run build      # прод-сборка
npm run start        # прод-сервер после build
npm run lint          # ESLint
npm run typecheck      # tsc --noEmit
```

Node.js 20.9+ обязателен.

## Что реализовано

- **Hero** с авторской SVG-отрисовкой дома (размерные линии ширины/высоты
  как реальные данные, не декор) и анимацией «прорисовки» при загрузке
  (`prefers-reduced-motion` учитывается).
- **Services** — 8 услуг в виде раскрывающегося списка (`<details>`):
  состав работ, средний срок, кнопка запроса сметы под конкретную
  услугу.
- **Projects** — портфолио из 8 демо-проектов с рабочим фильтром по
  категориям (All/Construction/Renovation/Commercial/Exterior) и
  детальной панелью (slide-over drawer): площадь, срок, год, описание,
  мини-галерея.
- **Before & After** — полностью самописный drag-слайдер (Pointer
  Events, мышь/тач/клавиатура стрелками), без единой внешней
  библиотеки.
- **Cost Estimator** — калькулятор сметы: тип проекта × площадь
  (слайдер 20–500 м²) × уровень отделки × доп. работы → диапазон цены
  в реальном времени (`src/lib/estimator.ts`, чистая функция). Кнопка
  «Get Detailed Estimate» переносит параметры в форму заявки.
- **Get a Quote** — полноценная форма (имя/телефон/email/тип
  проекта/локация/площадь/бюджет/дата начала/сообщение/файл),
  клиентская валидация (`src/lib/quote.ts`), состояние «отправлено» —
  без бэкенда, как и просили.
- **Request a Call** — компактная модалка (имя/телефон/удобное время),
  доступна из нескольких мест сайта через единую шину событий
  (`src/lib/quote-events.ts`).
- **How We Work** — вертикальный таймлайн из 7 шагов на том же
  «размерном» визуальном языке, что и hero.
- **Reviews** — горизонтальная карусель на нативном CSS
  `scroll-snap` (без JS-библиотек), на десктопе видно сразу несколько
  отзывов.
- **FAQ** — аккордеон на `<details>`, несколько пунктов можно держать
  открытыми одновременно.
- **SEO/метаданные** — `sitemap.ts`, `robots.ts`, `manifest.ts`,
  JSON-LD `GeneralContractor`, динамическая OG-картинка и
  apple-touch-icon через `next/og` (без внешних файлов).
- **Безопасность и отказоустойчивость** — заголовки
  `X-Content-Type-Options`/`X-Frame-Options`/`Referrer-Policy`/
  `Permissions-Policy`, локализованный `error.tsx` + корневой
  `global-error.tsx`.

## Структура

```
src/
  app/
    layout.tsx, page.tsx     # метаданные, JSON-LD, сборка секций
    error.tsx, global-error.tsx, not-found.tsx
    opengraph-image.tsx, apple-icon.tsx, icon.svg
    sitemap.ts, robots.ts, manifest.ts
    globals.css               # палитра, шрифт, keyframes
  components/
    Hero, QuickContact, Services, Projects, ProjectDetail,
    BeforeAfter, Estimator, QuoteForm, CallbackModal, Process,
    Pricing, About, Team, Reviews, Trust, Faq, Contact, Footer,
    Header, MobileBar, Logo
    Graphics.tsx               # вся авторская SVG-графика сайта
    Icons.tsx                   # только функциональные иконки
    ui.tsx                        # кнопки/инпуты
  lib/
    site.ts                      # реквизиты компании, часы работы
    data.ts                       # услуги, проекты, команда, отзывы, FAQ, процесс
    estimator.ts                   # логика калькулятора сметы
    quote.ts                        # валидация формы заявки, бюджеты
    quote-events.ts                  # шина событий для pre-fill формы
```

## Как адаптировать под реального клиента

1. `src/lib/site.ts` — название, адрес, телефон, соцсети, часы работы.
2. `src/lib/data.ts` — услуги, проекты портфолио, команда, отзывы, FAQ,
   этапы процесса.
3. `src/lib/estimator.ts` — ставки за м² и доп. работы калькулятора —
   это демо-цифры, не реальный прайс-лист.
4. Фотографии — замените компоненты `ProjectArt`/`HouseElevation`/
   `BeforeArt`/`AfterArt` из `Graphics.tsx` на реальные снимки объектов,
   когда они появятся.
5. `src/app/api` — в проекте нет бэкенда (по ТЗ). Когда понадобится
   реальная отправка заявок, добавьте API-роут и `fetch` в
   `QuoteForm.tsx`/`CallbackModal.tsx` — форма и валидация уже готовы.

## Важно

Демонстрационный проект. Заявки никуда не уходят и нигде не
сохраняются — форма и калькулятор работают полностью на клиенте.

## Languages

The public website has three localized routes:

- `/lv` — Latvian (default fallback for visitors whose browser language is not supported)
- `/ru` — Russian
- `/en` — English

The header and mobile navigation include a persistent language switcher. The root URL `/` redirects according to the visitor's first `Accept-Language` preference. Metadata, page title/description, Open Graph locale, canonical URLs and sitemap language alternates are localized for each route.

All customer-facing site content is maintained in `src/lib/i18n/messages.ts`; the shared provider and translated data adapter are in `src/lib/i18n/`.
