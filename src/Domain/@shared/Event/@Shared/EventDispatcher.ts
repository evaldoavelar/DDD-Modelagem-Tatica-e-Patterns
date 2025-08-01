import EventDispatcherInterface from "./event-dispatcher";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";


export class EventDispatcher implements EventDispatcherInterface {

    handles: { [eventName: string]: EventHandlerInterface[] } = {};

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (!this.handles[eventName]) {
            return;
        }
        for (const handler of this.handles[eventName]) {
            handler.handle(event);
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(this.handles[eventName]) {
            this.handles[eventName].push(eventHandler);
        } else {
            this.handles[eventName] = [eventHandler];
        }
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if(this.handles[eventName]) {
            this.handles[eventName] = this.handles[eventName].filter(handler => handler !== eventHandler);
        }
    }

    unregisterAll(eventHandler: EventHandlerInterface): void {
        for (const eventName in this.handles) {
            this.handles[eventName] = this.handles[eventName].filter(handler => handler !== eventHandler);
        }
    }

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.handles;
    }
}