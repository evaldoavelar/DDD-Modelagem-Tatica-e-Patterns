import EventInterface from "../@Shared/event.interface";

export default class ProductCreateEvent implements EventInterface{
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData:any ) { 
        this.dataTimeOccurred = new Date();
        this.eventData = eventData; 
    }

}