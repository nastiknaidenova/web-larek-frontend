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
    <li>Базовый класс <code>Api</code>
      <p>Класс обеспечивает обмен данными с сервером с помощью методов <code>GET</code> и <code>POST</code>. В конструктор входит два аргумента:  <code>baseURL</code> - базовый URL и <code>option</code> - запросы. При отсутствии <code>option</code> используется пустой объект.</p>
      <p>Методы:
        <ul>
          <li><code>GET</code> - запрашивает данные от сервера.</li>
          <li><code>POST</code> - передаёт данные на сервер.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>LarekAPI</code> расширяет базовый класс <code>Api</code> и реализует интерфейс <code>ILarekAPI</code>
      <p>Класс LarekAPI предоставляет интерфейс для работы с продуктами и заказами через API. Он инкапсулирует логику получения данных и их обработки.</p>
      <p>Конструктор: <code>constructor(cdn: string, baseUrl: string, options?: RequestInit)</code>.<br />Принимает аргументы <code>cdn</code> (базовый URL для изображений), <code>baseUrl</code> (базовый URL API) и опциональные настройки запроса. </p>
      <p>Методы:
        <ul>
          <li><code>getProduct (id: string): Promise&ltIProduct&gt</code> - отправляет запрос на сервер для получения информации о продукте с указанным идентификатором.</li>
          <li><code>getProductList (): Promise&ltIProduct[]&gt</code> - отправляет запрос на сервер для получения списка всех товаров.</li>
          <li><code>orderProduct (order: IOrder): Promise&ltIOrderResult&gt</code> - отправляет запрос на сервер для оформления заказа с указанными данными.</li>
        </ul>
      </p>
    </li>
    <li>Базовый класс бизнес-модели <code>Model&ltT&gt</code>
      <p>От этого класса наследуются <code>Product</code> и <code>AppState</code>. Конструктор принимает начальный данные для модели и объект событий для уведомления об изменениях в модели. Класс содержит метод <code>emitChange</code>, для того чтобы вызывать событие из компонента.</p>
      <p>Конструктор: <code>constructor(data: Partial&ltT&gt, protected events: IEvents)</code>.<br />Аргументами конструктора являются частичные данные типа <code>T</code> и объект событий <code>IEvents</code>. Частичные данные <code>T</code> представляют структуру данных, которая используется для инициализации экземпляра класса. Объект <code>IEvents</code> содержит определения различных событий, которые могут быть сгенерированы и обработаны внутри класса.</p>
      <p>Методы:
        <ul>
          <li><code>emitChange</code> - используется для уведомления других частей приложения о том, что модель была изменена.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>AppState</code> расширяет базовый класс <code>Model&ltT&gt</code>
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
    <li>Класс <code>Product</code> расширяет базовый класс <code>Model&ltT&gt</code>
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
      <p>Конструктор: <code>constructor(protected readonly container: HTMLElement)</code>.<br /> В конструктор входит один аргумент - начальные данные для модели.</p>
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
    <li>Класс <code>Card&ltT&gt</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой компонент карточки товара. Он используется для отображения информации о товаре, включая название, изображение, цену, категорию, описание и кнопки для взаимодействия.</p>
      <p>Конструктор: <code>constructor(blockName: string, container: HTMLElement, action?: ICardAction)</code>.<br />Аргументами конструктора являются <code>blockName</code> - строка, указывающая на имя блока (класс CSS) для элементов карточки товара; <code>container</code> - HTML-элемент, в который будет встроен компонент карточки товара; <code>action</code> - объект типа <code>ICardAction</code>, содержащий действие для кнопки карточки товара (например, обработчик события клика).</p>
      <p>Поля:
        <ul>
          <li><code>_title</code> - HTML-элемент для отображения названия товара.</li>
          <li><code>_image</code> - HTML-элемент для отображения изображения товара.</li>
          <li><code>_category</code> - HTML-элемент для отображения категории товара.</li>
          <li><code>_description</code> - HTML-элемент для отображения описания товара.</li>
          <li><code>_price</code> - HTML-элемент для отображения цены товара.</li>
          <li><code>_button</code> - HTML-элемент для отображения кнопки карточки товара.</li>
          <li><code>_buttonModal</code> - HTML-элемент для отображения кнопки модального окна.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>priceDisabled(value: number | null)</code> - отключает кнопку карточки товара, если цена не указана (null).</li>
          <li><code>set id(value: string)</code> - устанавливает идентификатор товара.</li>
          <li><code>set title(value: string)</code> - устанавливает название товара.</li>
          <li><code>set buttonTitle(value: string)</code> - устанавливает текст на кнопке карточки товара.</li>
          <li><code>set image(value: string)</code> - устанавливает изображение товара.</li>
          <li><code>set price(value: number | null)</code> - устанавливает цену товара.</li>
          <li><code>set category(value: string)</code> - устанавливает категорию товара.</li>
          <li><code>set description(value: string | string[])</code> - устанавливает описание товара.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>BasketItem</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой элемент корзины, отображающий информацию о товаре (номер, название, цена) и кнопку для удаления товара из корзины. Он наследует функциональность класса Component и добавляет методы для управления отображением информации о товаре.</p>
      <p>Конструктор: <code>constructor(container: HTMLElement, index: number, action?: ICardAction)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-элемент для отображения элемента корзины. <code>index</code> - номер товара в корзине. <code>action</code> - действие, которое будет выполнено при нажатии на кнопку элемента корзины.</p>
      <p>Поля:
        <ul>
          <li><code>_index: HTMLElement</code> - HTML-элемент для отображения номера товара в корзине.</li>
          <li><code>_title: HTMLElement </code> - HTML-элемент для отображения названия товара.</li>
          <li><code>_price: HTMLElement</code> - HTML-элемент для отображения цены товара.</li>
          <li><code>_button: HTMLButtonElement</code> - HTML-кнопка для удаления товара из корзины.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>set index(value: number): void</code> - устанавливает значение индекса товара в корзине и обновляет соответствующий элемент DOM.</li>
          <li><code>set title(value: string): void</code> - устанавливает название товара и обновляет соответствующий элемент DOM.</li>
          <li><code>set price(value: number): void</code> - устанавливает цену товара и обновляет соответствующий элемент DOM.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Basket</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой компонент корзины в интернет-магазине. Он отображает список выбранных товаров, общую стоимость и кнопку для оформления заказа.</p>
      <p>Конструктор: <code>constructor(container: HTMLElement, events: EventEmitter)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-элемент, в который будет встроен компонент корзины. <code>events</code> - экземпляр <code>EventEmitter</code>, используемый для обработки событий.</p>
      <p>Поля:
        <ul>
          <li><code>_list: HTMLElement</code> - HTML-элемент для отображения списка товаров в корзине.</li>
          <li><code>_total: HTMLElement</code> - HTML-элемент для отображения общей стоимости товаров в корзине.</li>
          <li><code>_button: HTMLElement</code> - HTML-элемент кнопки оформления заказа.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>disableButton(value: string): void</code> - устанавливает состояние кнопки (активна/неактивна).</li>
          <li><code>set items(items: HTMLElement[]): void</code> - устанавливает список товаров в корзине.</li>
          <li><code>set total(total: number): void</code> - устанавливает общую стоимость товаров в корзине.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Modal</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой модальное окно в интерфейсе. Он обеспечивает отображение контента в модальном окне, управление его открытием и закрытием, а также возможность передачи данных через события.</p>
      <p>Конструктор: <code>constructor(container: HTMLElement, events: IEvents)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-элемент модального окна. <code>events</code> - экземпляр <code>IEvents</code>, используемый для обработки событий.</p>
      <p>Поля:
        <ul>
          <li><code>_closeButton: HTMLButtonElement</code> - HTML-кнопка для закрытия модального окна.</li>
          <li><code>_content: HTMLElement</code> - HTML-элемент для отображения контента в модальном окне.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>set content(value: HTMLElement): void</code> - устанавливает контент в модальном окне.</li>
          <li><code>open(): void</code> - открывает модальное окно.</li>
          <li><code>close(): void</code> - акрывает модальное окно.</li>
          <li><code>render(data: IModalData): HTMLElement</code> - обновляет состояние модального окна и открывает его.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Page</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой страницу интерфейса. Он содержит элементы страницы, такие как счетчик товаров в корзине, каталог товаров, обертку страницы и элемент корзины, и обеспечивает их отображение и взаимодействие с помощью событий.</p>
      <p>Конструктор: <code>constructor(container: HTMLElement, events: IEvents)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-элемент страницы. <code>events</code> - экземпляр <code>IEvents</code>, используемый для обработки событий.</p>
      <p>Поля:
        <ul>
          <li><code>_counter: HTMLElement </code> - HTML-элемент для отображения счетчика товаров в корзине.</li>
          <li><code>_catalog: HTMLElement</code> - HTML-элемент для отображения каталога товаров.</li>
          <li><code>_wrapper: HTMLElement</code> - HTML-элемент для обертки контента страницы.</li>
          <li><code>_basket: HTMLElement</code> - HTML-элемент для отображения корзины.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>set counter(value: number): void </code> - устанавливает значение счетчика товаров в корзине.</li>
          <li><code>set catalog(items: HTMLElement[]): void</code> - устанавливает список товаров в каталоге.</li>
          <li><code>set locked(value: boolean): void</code> - блокирует или разблокирует страницу.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Success</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой компонент для отображения сообщения об успешном завершении операции. Он содержит элементы для отображения общей информации об успешной операции и кнопку для закрытия сообщения.</p>
      <p>Конструктор: <code>constructor(container: HTMLElement, actions: ISuccessActions)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-элемент для отображения компонента. <code>actions</code> - объект с действиями, которые можно выполнить после успешной операции.</p>
      <p>Поля:
        <ul>
          <li><code>_close: HTMLElement</code> - HTML-элемент кнопки закрытия сообщения.</li>
          <li><code>_total: HTMLElement</code> - HTML-элемент для отображения общей цены об успешной операции.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>setText(element: HTMLElement, text: string): void</code> - устанавливает текстовое содержимое элемента DOM.</li>
        </ul>
      </p>
    </li>
    <li>Базовый класс <code>Form&ltT&gt</code> расширяет базовый класс <code>Component&ltT&gt</code>
      <p>Этот класс представляет собой компонент формы в интерфейсе. Он обеспечивает взаимодействие с формой, включая обработку ввода данных, валидацию и отправку данных.</p>
      <p>Конструктор: <code>constructor(container: HTMLFormElement, events: IEvents)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-элемент формы. <code>events</code> - экземпляр <code>IEvents</code>, используемый для обработки событий.</p>
      <p>Поля:
        <ul>
          <li><code>_submit: HTMLButtonElement</code> - HTML-элемент кнопки отправки формы.</li>
          <li><code>_errors: HTMLElement</code> - HTML-элемент для отображения ошибок валидации формы.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>onInputChange(field: keyof T, value: string): void</code> - обработчик изменения значения в поле формы.</li>
          <li><code>set valid(value: boolean): void</code> - устанавливает состояние кнопки отправки формы (активна/неактивна).</li>
          <li><code>set errors(value: string): void</code> - устанавливает текст ошибки валидации формы.</li>
          <li><code>render(state: Partial & IFormState): HTMLElement</code> - обновляет состояние формы и возвращает HTML-элемент формы.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Order</code> расширяет базовый класс <code>Form&ltT&gt</code>
      <p>Этот класс представляет собой форму для оформления заказа. Он наследует функциональность класса Form и добавляет методы для управления выбором способа оплаты и установки адреса доставки.</p>
      <p>Конструктор: <code>constructor(container: HTMLFormElement, events: IEvents)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-форма для оформления заказа. <code>events</code> - экземпляр <code>IEvents</code>, используемый для обработки событий.</p>
      <p>Поля:
        <ul>
          <li><code>_paymentContainer: HTMLDivElement</code> - контейнер для отображения кнопок выбора способа оплаты.</li>
          <li><code>_paymentButton: HTMLButtonElement[]</code> - массив кнопок выбора способа оплаты.</li>
          <li><code>_addressInput: HTMLButtonElement</code> - контейнер для отображения адреса доставки.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>setToggleClassPayment(className: string): void</code> - устанавливает активный класс для кнопки выбора способа оплаты.</li>
          <li><code>set address(value: string): void</code> - устанавливает значение поля адреса доставки в форме.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Contacts</code> расширяет базовый класс <code>Form&ltT&gt</code>
      <p>Этот класс представляет собой форму для ввода контактной информации (телефона и email) при оформлении заказа. Он наследует функциональность класса Form и добавляет методы для установки значений полей телефона и email.</p>
      <p>Конструктор: <code>constructor(container: HTMLFormElement, events: IEvents)</code>.<br />Аргументами конструктора являются <code>container</code> - HTML-форма для ввода контактной информации. <code>events</code> - экземпляр <code>IEvents</code>, используемый для обработки событий.</p>
      <p>Поля:
        <ul>
          <li><code>_phoneInput: HTMLButtonElement</code> - контейнер для поля телефона в форме.</li>
          <li><code>_emailInput: HTMLButtonElement</code> - контейнер для поля email в форме.</li>
        </ul>
      </p>
      <p>Методы:
        <ul>
          <li><code>set phone(value: string): void</code> - устанавливает значение поля телефона в форме.</li>
          <li><code>set email(value: string): void</code> - устанавливает значение поля email в форме.</li>
        </ul>
      </p>
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
