import { EventBus } from "./EventBus";
import { Event } from "./Event";
import { EventListener } from "./EventListener";

export class SimpleEventBus implements EventBus{

    private readonly listeners: Array<EventListener>;

    constructor(){
        this.listeners = new Array<EventListener>();
    }
    
    subscribe(listener: EventListener): void {
        this.listeners.push(listener);
    }    

    handle(event: Event): void {
        this.listeners.forEach( listener => listener.onEventArrived(event));
    }

}