import EventHandlerInterface from "../../@Shared/event-handler.interface";
import EventInterface from "../../@Shared/event.interface";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface{
   
    handle(event: EventInterface): void {
        console.log(`evento recebido ${JSON.stringify(event)}`);
    }

}