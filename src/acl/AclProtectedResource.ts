import { PropectedResource } from "../acl/ProtectedResorce";
import { Identity } from "../acl/Identity";
import { AccessControlList } from "../acl/AccessControlList";
import { Token } from "../acl/Token";
import { EventBus } from "../events/EventBus";
import { ResourceAccessRequestEvent } from "../events/ResourceAccessRequestEvent";
import { EventListener } from "../events/EventListener";
import { ResourceAccessRequestAcceptEvent } from "../events/ResourceAccessRequestAcceptEvent";
import { ResourceAccessRequestRejectEvent } from "../events/ResourceAccessRequestRejectEvent";

class ResourceIdentity implements Identity {

    private readonly _id: string;

    constructor(id: string) {
        this._id = id;
    }

    id(): string {
        return this._id;
    }

    equalsTo(other: Identity): boolean {
        return this._id === other.id();
    }

}

export class AclProtectedResource<T extends Identity> implements PropectedResource, EventListener {

    private readonly eventBus: EventBus;
    private readonly resources: Array<T>;
    private readonly acl: AccessControlList;

    constructor(eventBus: EventBus) {
        this.resources = new Array<T>();
        this.acl = new AccessControlList();

        this.eventBus = eventBus;
        this.eventBus.subscribe(this);
    }

    onEventArrived(event: Event) {

        if (event instanceof ResourceAccessRequestAcceptEvent) {
            this.handleAcceptEvent(event as ResourceAccessRequestAcceptEvent);
        } else if (event instanceof ResourceAccessRequestRejectEvent) {
            this.handleRejectEvent(event as ResourceAccessRequestRejectEvent);
        }

    }

    private handleAcceptEvent(event: ResourceAccessRequestAcceptEvent) {
        if (this.acl.hasResource(event.getResource()) && this.acl.isOwner(event.getOwner(), event.getResource())) {
            this.acl.grantAccess(event.getClaimer(), event.getResource());
        }
    }

    private handleRejectEvent(event: ResourceAccessRequestRejectEvent) {
        // DO WHAT?
    }

    addResource(token: Token, resource: T) {
        this.resources.push(resource);
        this.acl.grantAccess(token.id(), resource);
    }

    getResourceById(token: Token, resourceId: string): T {

        if (!this.acl.hasAccess(token.id(), new ResourceIdentity(resourceId))) {
            throw new Error("Access to resource failed due to ACL mismatch");
        }

        return this.resources.find(resource => resource.id() === resourceId);
    }

    requestAccess(token: Token, resource: Identity): void {
        const owner = this.acl.getOwner(resource);
        this.eventBus.handle(new ResourceAccessRequestEvent(owner, token.id(), resource));
    }

    grantAccess(token: Token, identity: Identity, resource: Identity): void {
        this.acl.grantAccess(identity, resource);
    }

    revokeAccess(token: Token, identity: Identity, resource: Identity): void {
        this.acl.revokeAccess(identity, resource);
    }

}