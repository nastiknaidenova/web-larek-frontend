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
        <li><a href="#сборка-и-запуск">Сборка и запуск</a></li>
      </ul>
    </li>
    <li><a href="#документация">Документация</a></li>
      <ul>
        <li><a href="#применяемая-архитектура-и-подход">Применяемая архитектура и подход</a></li>
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
***
<details><a name="слой-модели"></a>
  <summary>Слой модели (Model)</summary>
  <ul>
    <li>Класс <code>Api</code>
      <p>Класс обеспечивает обмен данными с сервером с помощью методов <code>GET</code> и <code>POST</code>. В конструктор входит два аргумента:  <code>baseURL</code> - базовый URL и <code>option</code> - запросы. При отсутствии <code>option</code> используется пустой объект.</p>
      <p>Методы:
        <ul>
          <li><code>GET</code> - запрашивает данные от сервера.</li>
          <li><code>POST</code> - передаёт данные на сервер.</li>
        </ul>
      </p>
    </li>
    <li>Базовый класс бизнес-модели <code>Model</code>
      <p>От этого класса наследуются <code>Product</code> и <code>AppState</code>. Конструктор принимает начальный данные для модели и объект событий для уведомления об изменениях в модели. Класс содержит метод <code>emitChange</code>, для того чтобы вызывать событие из компонента.</p>
      <p>Конструктор: <code>constructor(data: Partial&ltT&gt, protected events: IEvents)</code>.<br />Аргументами конструктора являются частичные данные типа <code>T</code> и объект событий <code>IEvents</code>. Частичные данные <code>T</code> представляют структуру данных, которая используется для инициализации экземпляра класса. Объект <code>IEvents</code> содержит определения различных событий, которые могут быть сгенерированы и обработаны внутри класса.</p>
      <p>Методы:
        <ul>
          <li><code>emitChange</code> - используется для уведомления других частей приложения о том, что модель была изменена.</li>
        </ul>
    </li>
    <li>Класс <code>AppState</code> наследуется от <code>Model</code>
      <p></p>
      <p></p>
      <p></p>
    </li>
    <li>Класс <code>Product</code> наследуется от <code>Model</code>
      <p></p>
      <p></p>
      <p></p>
    </li>
  </ul>
</details>

***
***
<details><a name="слой-представления"></a>
  <summary>Слой представления (View)</summary>
  <ul>
    <li>Базовый класс <code>Component&ltT&gt</code>
      <p>Это базовый абсткратный класс для отображения компонентов, от него наследуются компоненты представления.</p>
      <p>Конструктор: <code>constructor(protected readonly container: HTMLElement)</code>. В конструктор входит один аргумент- начальные данные для модели.</p>
      <p>
        <ul>
          <li><code>toggleClass</code> - переключает классы элемента.</li>
          <li><code>setText</code> - устанавливает текст содержимого.</li>
          <li><code>setDisable</code> - устанавливает статус <code>Disabled</code>.</li>
          <li><code>setHidden</code> - скрывает элемент.</li>
          <li><code>setVisible</code> - покаызвает элемент.</li>
          <li><code>setImage</code> - устанавливает изображение с альтернативным текстом.</li>
          <li><code>render</code> - отображает возвращаемое значение элемента.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code></code>
      <p></p>
      <p></p>
      <p></p>
    </li>
    <li>Класс <code></code>
      <p></p>
      <p></p>
      <p></p>
    </li>
  </ul>
</details>

***
***
<details><a name="слой-презентера"></a>
  <summary>Слой презентера (Presenter)</summary>
  <ul>
    <li>Базовый класс <code></code>
      <p></p>
      <p></p>
      <p></p>
    </li>
    <li>Класс <code></code>
      <p></p>
      <p></p>
      <p></p>
    </li>
    <li>Класс <code></code>
      <p></p>
      <p></p>
      <p></p>
    </li>
  </ul>
</details>

***

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
