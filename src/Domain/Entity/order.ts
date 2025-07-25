import { OrderItem } from './order-item';

export class Order {

    _id: string;
    _customerId: string; 
    _ordersItems: Array<OrderItem> = [];
  

    constructor(id: string, customerId: string, ordersItems: Array<OrderItem> = []) {
        this._id = id;
        this._customerId = customerId; 
        this._ordersItems = ordersItems;

        this.validate();
    }

    validate() {
        if (this._customerId === '') {
            throw new Error('Customer ID is required');
        }
        if (this._ordersItems.length === 0) {
            throw new Error('At least one order item is required');
        }

        this._ordersItems.forEach(item => item.validate());

        if (this.total <= 0) {
            throw new Error('Total total must be greater than zero');
        }        
    }

    
    get total(): number {
        let total = this._ordersItems.reduce((total, item) => total + item.orderItemTotal(), 0);
        return total ?? 0;
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get ordersItems(): Array<OrderItem> {
        return this._ordersItems;
    }
   
}