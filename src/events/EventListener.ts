import { Event } from "./Event";

export interface EventListener {

    onEventArrived(event: Event);

}