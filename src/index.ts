import './scss/styles.scss';
import { LarekAPI } from './components/LarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState, CatalogChangeEvent } from './components/AppState';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { BasketItem, Card } from './components/Card';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';
import { Contacts } from './components/Contacts';
import { IOrderContacts, IOrderDeliveryForm, IProduct } from './types';

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
const success = new Success(cloneTemplate(successTemplate), {
    onClick: () => { modal.close() }
})


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


events.on('card:select', (item: IProduct) => {
    appState.setPreview(item);
})


events.on('basket:changed', () => {
    page.counter = appState.getOrderProducts().length
    let total = 0
    basket.items = appState.getOrderProducts().map((item, index) => {
        const card = new BasketItem(cloneTemplate(cardBasketTemplate), index, {
            onClick: () => {
                appState.removeFromBasket(item.id);
                events.emit('basket:changed');
            }
        });
        total += item.price;
        return card.render({
            title: item.title,
            price: item.price,
        })
    })
    basket.total = total;
    //appState.order.total = total;
})


events.on('counter:changed', () => {
    page.counter = appState.basket.length;
})


events.on('product:add', (item: IProduct) => {
    appState.addToBasket(item);
    modal.close();
})


events.on('product:delete', (item: IProduct) => {
    appState.removeFromBasket(item.id);
})


events.on('preview:changed', (item: IProduct) => {
    if (item) {
        const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
            onClick: () => {
                events.emit('product:add', item);
                modal.close();
            }
        });
        const buttonTitle: string = item.price === null 
            ? (appState.productOrder(item) ? 'Получить ещё один' : 'Получить') 
            : (appState.productOrder(item) ? 'Купить ещё один' : 'Купить');
        card.buttonTitle = buttonTitle;
        modal.render({
            content: card.render({
                title: item.title,
                description: item.description,
                image: item.image,
                price: item.price,
                category: item.category,
                button: buttonTitle,
            })
        });
    }
});


events.on('order:open', () => {
    const orderData = appState.order;
    const paymentMethod = orderData.payment || '';
    appState.setPaymentMethod(paymentMethod);
    delivery.setToggleClassPayment(paymentMethod);
    const isValid = orderData.payment !== '' && orderData.address !== '';
    modal.render({
        content: delivery.render({
            payment: orderData.payment || '',
            address: orderData.address || '',
            valid: isValid,
            errors: [],
        })
    })
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
    const orderData = appState.order;
    const isValid = orderData.phone !== '' && orderData.email !== '';
    modal.render({
        content: contact.render({
            phone: orderData.phone || '',
            email: orderData.email || '',
            valid: isValid,
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
    let total = 0;
    appState.getOrderProducts().forEach((item) => { total += item.price });
    appState.order.total = total;
    appState.order.items = appState.basket
        .filter((item) => item.price != null)
        .map((item) => item.id);
    api.orderProduct(appState.order)
    .then((result) => {
        appState.clearBasket()
        appState.clearOrder()
        appState.setPaymentMethod('');
        delivery.setToggleClassPayment('');
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
