import { SendEmailWhenProductIsCreatedHandler } from "../Product/Handler/SendEmailWhenProductIsCreatedHandler";
import ProductCreateEvent from "../Product/produtc-create.event";
import EventDispatcherInterface from "./event-dispatcher"; 
import EventHandlerInterface from "./event-handler.interface";
import { EventDispatcher } from "./EventDispatcher";

describe("Domaind Event Dispatcher", () => {

    it("should register an event handler", () => {
        const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
        const eventHandler:EventHandlerInterface = new  SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register(ProductCreateEvent.name, eventHandler);

        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name][0]).toBe(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
        const eventHandler: EventHandlerInterface = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register(ProductCreateEvent.name, eventHandler);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name]).toMatchObject([eventHandler]);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name].length).toBe(1);

        eventDispatcher.unregister(ProductCreateEvent.name, eventHandler);

        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name].length).toBe(0);
    });

    it("should unregister all event handlers for a specific handler", () => {
        const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
        const eventHandler: EventHandlerInterface = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register(ProductCreateEvent.name, eventHandler);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name]).toMatchObject([eventHandler]);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name].length).toBe(1);

        eventDispatcher.unregisterAll(eventHandler);

        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name].length).toBe(0);
    });

    it("should notify an event", () => {
        const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
        const eventHandler: EventHandlerInterface = new SendEmailWhenProductIsCreatedHandler();
        const spyHandle = jest.spyOn(eventHandler, "handle");
        const event = new ProductCreateEvent({ name: "Product 1", price: 100 });

        eventDispatcher.register(ProductCreateEvent.name, eventHandler);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[ProductCreateEvent.name][0]).toBe(eventHandler);
        eventDispatcher.notify(event);

        expect(spyHandle).toHaveBeenCalledWith(event);
    });

});