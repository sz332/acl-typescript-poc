import { Event } from "./Event";
import { EventListener } from "./EventListener";

export interface EventBus {

    subscribe(listener: EventListener): void;
    push(event: Event): void;

}