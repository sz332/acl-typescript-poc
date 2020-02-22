import { User } from "src/core/User";
import { EventBus } from "src/events/EventBus";
import { ResourceAccessRequestEvent } from "src/events/ResourceAccessRequestEvent";
import { Identity } from "./Identity";
import { uuid } from "uuidv4";

export class AccessRequest {

    id: String;
    resource: Identity;
    claimer: Identity;

    constructor(event: ResourceAccessRequestEvent){
        this.id = uuid();
        this.resource = event.getResource();
        this.claimer = event.getClaimer();
    }

}

export class Permissions {

    private readonly owner: User;
    private readonly eventBus: EventBus;
    private readonly accessRequests: Array<AccessRequest>;

    constructor(owner: User, eventBus: EventBus){
        this.owner = owner;
        this.eventBus = eventBus;
        this.accessRequests = new Array<AccessRequest>();
        
        eventBus.subscribe(this);
    }

    onEventArrived(event: Event){
        if (event instanceof ResourceAccessRequestEvent){
            const requestEvent = event as ResourceAccessRequestEvent;
            if (requestEvent.getOwner().equalsTo(this.owner)){
                this.accessRequests.push(new AccessRequest(requestEvent));
            }
        }
    }

    accessRequestList(): Array<AccessRequest>{
        return [...this.accessRequests];
    }

    acceptAccessRequest(requestId: string): void{

    }

    declineAccessRequest(requestId: string): void{

    }

    private hasRequest(requestId: string): boolean {
        return true;
    }

}