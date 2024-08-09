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
      <p>Этот класс представляет собой модель приложения и содержит данные о каталоге товаров, корзине, заказе, предпросмотре товара, ошибках формы и методах для управления этими данными. </p>
      <p>Конструктор: не принимает аргументов и инициализирует поля класса соответствующими значениями.</p>
      <p>Поля:
        <ul>
          <li><code>catalog: IProduct[]</code> - массив товаров в каталоге.</li>
          <li><code>basket: IProduct[]</code> - массив товаров в корзине.</li>
          <li><code>order: IOrder</code> - информация о заказе.</li>
          <li><code>preview: string | null</code> - идентификатор предпросматриваемого товара.</li>
          <li><code>formErrors: FormError</code> - объект, содержащий ошибки формы.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>updateBasket(): void</code> - обновляет состояние корзины и вызывает соответствующие события.</li>
          <li><code>clearBasket(): void</code> - очищает корзину.</li>
          <li><code>clearOrder(): void</code> - очищает информацию о заказе.</li>
          <li><code>setCatalog(items: IProduct[]): void</code> - устанавливает каталог товаров.</li>
          <li><code>setPreview(item: Product): void</code> - устанавливает предпросматриваемый товар.</li>
          <li><code>getOrderProducts(): IProduct[]</code> - возвращает товары из заказа.</li>
          <li><code>productOrder(item: IProduct): boolean</code> - проверяет, содержится ли товар в заказе.</li>
          <li><code>addToBasket(item: Product): void</code> - добавляет товар в корзину.</li>
          <li><code>emoveFromBasket(id: string): void</code> - удаляет товар из корзины.</li>
          <li><code>getTotal(): number</code> - вычисляет общую стоимость заказа.</li>
          <li><code>setPaymentMethod(method: string): void</code> - устанавливает способ оплаты.</li>
          <li><code>setOrderDeliveryField(value: string): void</code> - устанавливает адрес доставки.</li>
          <li><code>setOrderContactField(field: keyof IOrderContacts, value: string): void</code> - устанавливает контактные данные заказа.</li>
          <li><code>validateDelivery(): boolean</code> - валидирует данные о доставке и возвращает результат проверки.</li>
          <li><code>validateContact(): boolean</code> - валидирует контактные данные и возвращает результат проверки.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Product</code> наследуется от <code>Model</code>
      <p>Этот класс представляет собой модель продукта в интернет-магазине. Он содержит информацию о продукте, такую как идентификатор, описание, изображение, название, категория и цена.</p>
      <p>Конструктор: <code>constructor(data: IProduct)</code><br />В качестве аргумента конструктор принимает <code>data</code> - объект типа <code>IProduct</code>, содержащий информацию о продукте.</p>
      <p>Поля:
        <ul>
          <li><code>id: string</code> - идентификатор продукта.</li>
          <li><code>description: string</code> - описание продукта.</li>
          <li><code>image: string</code> - URL изображения продукта.</li>
          <li><code>title: string</code> - название продукта.</li>
          <li><code>category: string</code> - категория продукта.</li>
          <li><code>price: number</code> - цена продукта.</li>
        </ul>
      </p>
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
      <p>Методы:
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
    <li>Класс <code>EventEmitter</code>
      <p>Этот класс реализует паттерн "Наблюдатель", позволяет уведомлять и подписываться на события, так же сбрасывать от одного события либо же от всех событий.</p>
      <p>Методы:
        <ul>
          <li><code>on</code> - подписка на событие.</li>
          <li><code>off</code> -отписка от события.</li>
          <li><code>emit</code> - уведомление о событии.</li>
          <li><code>onAll</code> - подписка на все события.</li>
          <li><code>offAll</code> - отписка от всех событий.</li>
        </ul>
      </p>
      <p></p>
    </li>
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
