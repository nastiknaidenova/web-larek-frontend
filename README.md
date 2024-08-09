<!-- BACK TO TOP LINK -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![HTML][HTML-shield]][HTML-url]
[![Sass CSS][Sass CSS-shield]][Sass CSS-url]
[![TypeScript][TypeScript-shield]][TypeScript-url]
[![Webpack][Webpack-shield]][Webpack-url]

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/nastiknaidenova/web-larek-frontend">
    <img src="src/images/logo.svg" alt="Logo" width="320" height="180">
  </a>
  <h3 align="center">Проектная работа "WEB-Ларёк"</h3>
  <p align="center">
    Удобный интернет-магазин с товарами для веб-разработчиков!
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Содержание</summary>
  <ul>
    <li>
      <a href="#используемый-стек-структура-проекта-и-важные-файлы">Используемый стек, структура проекта и важные файлы</a>
      <ul>
        <li><a href="#используемый-стек">Используемый стек</a></li>
        <li><a href="#структура-проекта">Структура проекта</a></li>
        <li><a href="#важные-файлы">Важные файлы</a></li>
      </ul>
    </li>
    <li>
      <a href="#инструкция-по-сборке-и-запуску">Инструкция по сборке и запуску</a>
      <ul>
        <li><a href="#установка">Установка</a></li>
        <li><a href="#сборка и запуск">Сборка и запуск</a></li>
      </ul>
    </li>
    <li><a href="#документация">Документация</a></li>
      <ul>
        <li><a href="#применяемая-архитектура">Применяемая архитектура</a></li>
        <li><a href="#слой-модели">Слой модели</a></li>
        <li><a href="#слой-представления">Слой представления</a></li>
        <li><a href="#слой-презентера">Слой презентера</a></li>
      </ul>
    <li><a href="#автор">Автор</a></li>
  </ul>
</details>

---

## Используемый стек, структура проекта и важные файлы

### Используемый стек

- [![HTML][HTML-shield]][HTML-url]
- [![Sass CSS][Sass CSS-shield]][Sass CSS-url]
- [![TypeScript][TypeScript-shield]][TypeScript-url]
- [![Webpack][Webpack-shield]][Webpack-url]

### Структура проекта

- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

### Важные файлы

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/styles/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

<p align="right">(<a href="#readme-top">вернуться наверх</a>)</p>

## Инструкция по сборке и запуску

### Установка

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

### Сборка и запуск

```
npm run build
```

или

```
yarn build
```

<p align="right">(<a href="#readme-top">вернуться наверх</a>)</p>

## Документация

### Применяемая архитектура и подход
В проекте применяется архитектура MVP Архитектура (Model-View-Presenter). MVP разделяет приложение на три основных слоя: модель, представление и презентер.

В проекте применяется событийно-ориентированный подход, основой которого служит реакция на происходящие в системе изменения.

Опишем послойно классы проекта и их взаимодействия.

### Слой модели
#### **Базовый класс бизнес-модели** `Model`
От этого класса наследуются `Product` и `AppState`. Конструктор принимает начальный данные для модели и объект событий для уведомления об изменениях в модели. Класс содержит метод `emitChange`, для того чтобы вызывать событие из компонента

**Конструктор:** `constructor(data: Partial<T>, protected events: IEvents)`.  
Аргументами конструктора являются частичные данные типа `T` и объект событий `IEvents`. Частичные данные `T` представляют структуру данных, которая используется для инициализации экземпляра класса. Объект `IEvents` содержит определения различных событий, которые могут быть сгенерированы и обработаны внутри класса.

**Метод** `emitChange`:  
 используется для уведомления других частей приложения о том, что модель была изменена.

### Слой представления

### Слой презентера

<p align="right">(<a href="#readme-top">вернуться наверх</a>)</p>

## Автор

[Анастасия Найденова](https://github.com/nastiknaidenova)

<p align="right">(<a href="#readme-top">вернуться наверх</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[HTML-shield]: https://img.shields.io/badge/HTML-v5-blue?style=flat&logo=html5&labelColor=FDEBD0&logoColor=blue
[HTML-url]: https://www.w3schools.com/html/html_intro.asp
[Sass CSS-shield]: https://img.shields.io/badge/Sass--CSS-v1.62-green?style=flat&logo=sass&labelColor=FDEBD0&logoColor=blue
[Sass CSS-url]: https://sass-lang.com/
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-v5.0-blue?style=flat&logo=typescript&labelColor=FDEBD0&logoColor=blue
[TypeScript-url]: https://www.typescriptlang.org/
[Webpack-shield]: https://img.shields.io/badge/Webpack-v5.81-green?style=flat&logo=webpack&labelColor=FDEBD0&logoColor=blue
[Webpack-url]: https://webpack.js.org/
