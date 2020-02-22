import { User } from "src/core/User";
import { EventBus } from "src/events/EventBus";
import { ResourceAccessRequestEvent } from "src/events/ResourceAccessRequestEvent";
import { Identity } from "./Identity";
import { uuid } from "uuidv4";
import { ResourceAccessRequestAcceptEvent } from "src/events/ResourceAccessRequestAcceptEvent";
import { ResourceAccessRequestRejectEvent } from "src/events/ResourceAccessRequestRejectEvent";

export class AccessRequest {

    id: string;
    resource: Identity;
    claimer: Identity;

    constructor(event: ResourceAccessRequestEvent) {
        this.id = uuid();
        this.resource = event.getResource();
        this.claimer = event.getClaimer();
    }

}

export class Permissions {

    private readonly owner: User;
    private readonly eventBus: EventBus;
    private readonly accessRequests: Array<AccessRequest>;

    constructor(owner: User, eventBus: EventBus) {
        this.owner = owner;
        this.eventBus = eventBus;
        this.accessRequests = new Array<AccessRequest>();

        eventBus.subscribe(this);
    }

    onEventArrived(event: Event) {
        if (event instanceof ResourceAccessRequestEvent) {
            const requestEvent = event as ResourceAccessRequestEvent;
            if (requestEvent.getOwner().equalsTo(this.owner)) {
                this.accessRequests.push(new AccessRequest(requestEvent));
            }
        }
    }

    accessRequestList(): Array<AccessRequest> {
        return [...this.accessRequests];
    }

    acceptAccessRequest(requestId: string): void {
        let accessRequest = this.removeRequest(requestId);
        this.eventBus.handle(new ResourceAccessRequestAcceptEvent(this.owner, accessRequest.claimer, accessRequest.resource));
    }

    rejectAccessRequest(requestId: string): void {
        let accessRequest = this.removeRequest(requestId);
        this.eventBus.handle(new ResourceAccessRequestRejectEvent(this.owner, accessRequest.claimer, accessRequest.resource));
    }

    private removeRequest(requestId: string): AccessRequest {

        for (let i = 0; i < this.accessRequests.length; i++) {
            const accessRequest = this.accessRequests[i];
            if (accessRequest.id === requestId) {
                this.accessRequests.slice(i, 1);
                return accessRequest;
            }
        }

        throw new Error("Request not found");
    }

}