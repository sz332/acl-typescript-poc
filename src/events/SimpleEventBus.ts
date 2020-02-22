import { EventBus } from "./EventBus";

export class SimpleEventBus implements EventBus{

    subscribe(listener: import("./EventListener").EventListener): void {
        throw new Error("Method not implemented.");
    }    
    
    push(event: import("./Event").Event): void {
        throw new Error("Method not implemented.");
    }

}