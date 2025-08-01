import EventHandlerInterface from '../../@Shared/event-handler.interface';
import EventInterface from '../../@Shared/event.interface';

export class LogWhenCustomerisCreated1hanlder implements EventHandlerInterface {
   
    handle(event: EventInterface): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}