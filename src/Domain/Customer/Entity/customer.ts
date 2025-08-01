import { AgreggateRoot } from "../../@shared/Domain/aggregate-root";
import EventDispatcherInterface from "../../@shared/Event/@Shared/event-dispatcher";
import CustomerAddressChangeEvent from "../../@shared/Event/Customer/customer-address-change.event";
import { CustomerCreatedEvent } from "../../@shared/Event/Customer/customer-create.events";
import { Address } from "./address";

export class Customer extends AgreggateRoot {


    private _id: string;
    private _name: string;
    private _address: Address | null = null;
    private _active: boolean = true;
    private _rewardPoints: number = 0; 

    constructor(id: string, name: string, eventDispatcher?: EventDispatcherInterface | undefined) {
        super(eventDispatcher);
        this._id = id;
        this._name = name;

        this.validate();
        this.addEvent(new CustomerCreatedEvent(this));        
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

    changeAddress(addr: Address) {
        if (addr === null || addr === undefined) {
            throw new Error('Address cannot be null or undefined');
        }
        this._address = addr;

        this.addEvent(new CustomerAddressChangeEvent(this));
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

