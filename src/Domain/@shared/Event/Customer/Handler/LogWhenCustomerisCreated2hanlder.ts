import EventHandlerInterface from '../../@Shared/event-handler.interface';
import EventInterface from '../../@Shared/event.interface';

export class LogWhenCustomerisCreated2hanlder implements EventHandlerInterface {
   
    handle(event: EventInterface): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}