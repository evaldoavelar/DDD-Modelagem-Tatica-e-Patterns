
export class OrderItem {

    _id: string;
    _orderId: string;
    _quantity: number;
    _price : number = 0; // Assuming price is set to 0 initially
    _productId: string;

    constructor(id: string, orderId: string, productId: string, price: number, quantity: number) {
        this._id = id;
        this._orderId = orderId;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;

        this.validate();
    }

    validate() {
        if (this._quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }

        if (this._price < 0) {
            throw new Error('Price cannot be negative');
        }
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    get id(): string {
        return this._id;
    }

    get orderId(): string {
        return this._orderId;
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price;
    }

    get productId(): string {
        return this._productId;
    }
}