import { Address } from "./address";

export class Customer {


    private _id: string;
    private _name: string;
    private _address: Address | null = null;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    validate() {
        if (this._name === '') {
            throw new Error('Name is required');
        }
    }

    changeName(name: string) {
        if (name === '') {
            throw new Error('Name cannot be empty');
        }
        this._name = name;
    }

    activate() {
        this.validate();
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(rewardPoints: number) {
        this._rewardPoints += rewardPoints;
    }

    changeAddress(arg0: Address) {
        if (arg0 === null || arg0 === undefined) {
            throw new Error('Address cannot be null or undefined');
        }
        this._address = arg0;
    }


    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get id(): string {
        return this._id;
    }

    get isActive(): boolean {
        return this._active;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address | null {
        return this._address;
    }
}

