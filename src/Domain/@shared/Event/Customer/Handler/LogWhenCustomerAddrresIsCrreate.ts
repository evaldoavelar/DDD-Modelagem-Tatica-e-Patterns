import EventHandlerInterface from "../../@Shared/event-handler.interface";
import EventInterface from "../../@Shared/event.interface";

export class LogWhenCustomerAddressIsCreatedHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
      
        console.log(`Endereço do cliente: ${event.eventData._id}, ${event.eventData._name} 
            alterado para: ${event.eventData._address._street}, ${event.eventData._address._city}, ${event.eventData._address._state}, 
            ${event.eventData._address._zipCode}`);
    }
}