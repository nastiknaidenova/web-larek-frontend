import { Model } from './base/model';
import { IAppState, IProduct, IOrder, FormError, 
         IOrderContacts, PaymentMethods } from '../types';

export type CatalogChangeEvent = {
    catalog: IProduct[];
}

export class AppState extends Model<IAppState> {
    catalog: IProduct[];
    basket: IProduct[] = [];
    order: IOrder = {
        payment: '',
        items: [],
        total: 0,
        email: '',
        phone: '',
        address: ''
    }
    preview: string | null;
    formErrors: FormError = {};

    updateBasket() {
        this.emitChanges('counter:changed', this.basket);
        this.emitChanges('basket:changed', this.basket);
    }

    clearBasket() {
        this.basket = [];
        this.updateBasket();
    }

    clearOrder() {
        this.order = {
            payment: '',
            items: [],
            total: 0,
            email: '',
            phone: '',
            address: ''
        }
    }

    setCatalog(items: IProduct[]) {
        this.catalog = items
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    getOrderProducts(): IProduct[] {
		return this.basket;
	}

    productOrder(item: IProduct): boolean {
        return this.basket.includes(item);
    } 

    addToBasket(item: IProduct) {
        this.basket.push(item);
        this.updateBasket();
    }

    removeFromBasket(id: string) {
        const index = this.basket.findIndex((it) => it.id === id);
        if (index !== -1) {
            this.basket.splice(index, 1);
            this.emitChanges('basket:changed');
        }
    }

    getTotal(): number {
        return this.order.items.reduce((total, item) => 
        total + this.catalog.find(it => it.id === item).price, 0);
    }

    setPaymentMethod(method: string) {
        this.order.payment = method as PaymentMethods;
        this.validateDelivery();
    }

    setOrderDeliveryField(value: string) {
        this.order.address = value;
        this.validateDelivery();
    }

    setOrderContactField(field: keyof IOrderContacts, value: string) {
        this.order[field] = value;
        this.validateContact();
    }

    validateDelivery() {
        const errors: typeof this.formErrors = {};
        if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        this.formErrors = errors;
        this.events.emit('deliveryFormError:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContact() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('contactFormError:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}
