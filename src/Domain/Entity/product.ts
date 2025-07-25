export class Product {
    _id: string;
    _name: string;
    _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    validate() {
        if (this._name === '') {
            throw new Error('Product name is required');
        }
        if (this._price <= 0) {
            throw new Error('Product price must be greater than zero');
        }
    }

    changeName(name: string) {
        if (name === '') {
            throw new Error('Product name cannot be empty');
        }
        this._name = name;
    }

    changePrice(price: number) {
        if (price <= 0) {
            throw new Error('Product price must be greater than zero');
        }
        this._price = price;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }
};
