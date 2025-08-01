import { Customer } from "../../../../Customer/Entity/customer";
import EventDispatcherInterface from '../../@Shared/event-dispatcher';
import EventHandlerInterface from '../../@Shared/event-handler.interface';
import { EventDispatcher } from '../../@Shared/EventDispatcher';
import { CustomerCreatedEvent } from "../customer-create.events";
import { LogWhenCustomerisCreated1hanlder } from './LogWhenCustomerisCreated1hanlder';
import { LogWhenCustomerisCreated2hanlder } from './LogWhenCustomerisCreated2hanlder';

describe("Customer is created event tests", () => {
    it("should create a customer created event", () => {
 
        const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
        const eventHandler1: EventHandlerInterface = new  LogWhenCustomerisCreated1hanlder();   
        const eventHandler2: EventHandlerInterface = new  LogWhenCustomerisCreated2hanlder();     
        
        // Register event handlers
        eventDispatcher.register(CustomerCreatedEvent.name, eventHandler1);
        expect(eventDispatcher.getEventHandlers[CustomerCreatedEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[CustomerCreatedEvent.name].length).toBe(1);
     
        eventDispatcher.register(CustomerCreatedEvent.name, eventHandler2);
        expect(eventDispatcher.getEventHandlers[CustomerCreatedEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[CustomerCreatedEvent.name].length).toBe(2);

        // Spy on the handle
        const spyHandle1 = jest.spyOn(eventHandler1, "handle");
        const spyHandle2 = jest.spyOn(eventHandler2, "handle");
    
        // Create a customer 
        const customer = new Customer("123", "John Doe", eventDispatcher);

        // Notify the event handlers 
        expect(spyHandle1).toHaveBeenCalledTimes(1);
        expect(spyHandle2).toHaveBeenCalledTimes(1);
    });
});
