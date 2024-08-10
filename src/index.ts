import './scss/styles.scss';
import { LarekAPI } from './components/LarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState, CatalogChangeEvent, Product } from './components/AppState';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { BasketItem, Card } from './components/Card';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';
import { Contacts } from './components/Contacts';
import { IOrderContacts, IOrderDeliveryForm } from './types';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appState = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new Order(cloneTemplate(deliveryTemplate), events)
const contact = new Contacts(cloneTemplate(contactTemplate), events);


events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appState.catalog.map(item => {
        const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category
        })
    })
})


events.on('basket:open', () => {
    modal.render({
        content: basket.render({})
    })
})


events.on('card:select', (item: Product) => {
    appState.setPreview(item);
})


events.on('basket:changed', () => {
    page.counter = appState.getOrderProducts().length
    let total = 0
    basket.items = appState.getOrderProducts().map((item, index) => {
        const card = new BasketItem(cloneTemplate(cardBasketTemplate), index, {
            onClick: () => {
                appState.removeFromBasket(item.id)
                basket.total = appState.getTotal();
            }
        });
        total += item.price;
        return card.render({
            title: item.title,
            price: item.price,
        })
    })
    basket.total = total;
    appState.order.total = total;
})


events.on('counter:changed', () => {
    page.counter = appState.basket.length;
})


events.on('product:add', (item: Product) => {
    appState.addToBasket(item);
    modal.close();
})


events.on('product:delete', (item: Product) => {
    appState.removeFromBasket(item.id);
})


events.on('preview:changed', (item: Product) => {
  if (item) {
        api.getProduct(item.id)
        .then((res) => {
            item.id = res.id;
            item.category = res.category;
            item.title = res.title;
            item.description = res.description;
            item.image = res.image;
            item.price = res.price;
            const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
                onClick: () => {
                    if (appState.productOrder(item)) {
                        appState.removeFromBasket(item.id);
                        modal.close();
                    } else {
                        events.emit('product:add', item);
                    }
                }
            })
            const buttonTitle: string = appState.productOrder(item) ? 'Убрать из корзины' : 'Купить';
            card.buttonTitle = buttonTitle;
            console.log('Button title:', buttonTitle);
            modal.render({
                content: card.render({
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    price: item.price,
                    category: item.category,
                    button: buttonTitle,
                })
            })
        })
    }
})


events.on('order:open', () => {
    appState.setPaymentMethod('');
    delivery.setToggleClassPayment('');
    modal.render({
        content: delivery.render({
            payment: '',
            address: '',
            valid: false,
            errors: [],
        })
    })
    appState.order.items = appState.basket.map((item) => item.id);
})


events.on('order.payment:change', (data: { target: string }) => {
	appState.setPaymentMethod(data.target);
})


events.on('order.address:change', (data: { value: string }) => {
	appState.setOrderDeliveryField(data.value);
})


events.on('deliveryFormError:change', (errors: Partial<IOrderDeliveryForm>) => {
    const { payment, address } = errors;
    delivery.valid = !payment && !address
    delivery.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
})


events.on('order:submit', () => {
    modal.render({
        content: contact.render({
            phone: '',
            email: '',
            valid: false,
            errors: [],
        })
    })
})


events.on(/^contacts\..*:change/, (data: {field: keyof IOrderContacts, value: string}) => {
    appState.setOrderContactField(data.field, data.value);
})


events.on('contactFormError:change', (errors: Partial<IOrderContacts>) => {
    const { email, phone } = errors;
    contact.valid = !email && !phone;
    contact.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
})


events.on('contacts:submit', () => {
    api.orderProduct(appState.order)
    .then((result) => {
        appState.clearBasket()
        appState.clearOrder()
        const success = new Success(cloneTemplate(successTemplate), {
            onClick: () => {
                modal.close()
            }
        })
        modal.render({
            content: success.render({
            total: result.total,
            })
        })
    })
    .catch(err => {
        console.error(err);
    })
})


events.on('modal:open', () => {
    page.locked = true;
})


events.on('modal:close', () => {
    page.locked = false; 
})


api.getProductList()
    .then(appState.setCatalog.bind(appState))
    .catch(err => {
        console.log(err);
    })
