import EventDispatcherInterface from "../Event/@Shared/event-dispatcher";
import { IDomainEvent } from "./domain-event.interface";

export abstract class AgreggateRoot{
    events: Set<IDomainEvent> = new Set();

    addEvent(event: IDomainEvent){
        this.events.add(event);
        if (this.eventDispatcher) {
            this.eventDispatcher.notify(event);
        }
    }   

    clearEvents(){
        this.events.clear();
    }

    constructor(private eventDispatcher?: EventDispatcherInterface) {
        
    }
}