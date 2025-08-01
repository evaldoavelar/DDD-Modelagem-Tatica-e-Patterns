import { Customer } from "../../../Customer/Entity/customer";
import EventInterface from "../@Shared/event.interface";

export default class CustomerAddressChangeEvent implements EventInterface {

    dataTimeOccurred: Date;
    eventData: Customer;

    constructor(eventData: Customer) { 
        this.dataTimeOccurred = new Date();
        this.eventData = eventData; 
    }
  
}