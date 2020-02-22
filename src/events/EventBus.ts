import { Event } from "./Event";
import { EventListener } from "./EventListener";

export interface EventBus {

    subscribe(listener: EventListener): void;
    handle(event: Event): void;

}