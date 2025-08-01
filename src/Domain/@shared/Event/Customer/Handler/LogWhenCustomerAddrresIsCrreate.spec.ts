import { Address } from "../../../../Customer/Entity/address";
import { Customer } from "../../../../Customer/Entity/customer";
import EventDispatcherInterface from "../../@Shared/event-dispatcher";
import EventHandlerInterface from "../../@Shared/event-handler.interface";
import { EventDispatcher } from "../../@Shared/EventDispatcher";
import CustomerAddressChangeEvent from "../customer-address-change.event";
import { LogWhenCustomerAddressIsCreatedHandler } from "./LogWhenCustomerAddrresIsCrreate";

describe("Customer address change event tests", () => {
    it("should create a customer address change event", () => {
        // Create an event dispatcher and handler
        const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
        const eventHandler: EventHandlerInterface = new LogWhenCustomerAddressIsCreatedHandler();

        // Register the event handler
        eventDispatcher.register(CustomerAddressChangeEvent.name, eventHandler);
        expect(eventDispatcher.getEventHandlers[CustomerAddressChangeEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[CustomerAddressChangeEvent.name].length).toBe(1);

        // Spy on the handle
        const spyHandle = jest.spyOn(eventHandler, "handle");

        // Create a customer 
        const customer = new Customer("123", "John Doe", eventDispatcher);

        // dispatch the event
        const address = new Address("123 Main St", "City", "State", "12345");
        customer.changeAddress(address);

   
        expect(spyHandle).toHaveBeenCalledTimes(1);
        expect(eventDispatcher.getEventHandlers[CustomerAddressChangeEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[CustomerAddressChangeEvent.name].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[CustomerAddressChangeEvent.name][0]).toBe(eventHandler);
    });
});