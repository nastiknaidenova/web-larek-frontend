import { IProduct } from '../../types';
import { IEvents } from './events';

export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

export class Model<T> implements IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;

    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    emitChanges(event: string, payload?: object) {
        this.events.emit(event, payload ?? {});
    }
}
