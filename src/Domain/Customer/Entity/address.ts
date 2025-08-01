export class Address {

    _street: string;
    _city: string;
    _state: string;
    _zipCode: string;

    constructor(street: string, city: string, state: string, zipCode: string) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
    }

    validate() {
        if (this._street === '') {
            throw new Error('Street is required');
        }
        if (this._city === '') {
            throw new Error('City is required');
        }
        if (this._state === '') {
            throw new Error('State is required');
        }
        if (this._zipCode === '') {
            throw new Error('Zip code is required');
        }
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }
}