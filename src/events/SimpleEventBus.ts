import { EventBus } from "./EventBus";
import { Event } from "./Event";
import { EventListener } from "./EventListener";

export class SimpleEventBus implements EventBus{

    

    subscribe(listener: EventListener): void {
        throw new Error("Method not implemented.");
    }    
    
    handle(event: Event): void {
        throw new Error("Method not implemented.");
    }

}