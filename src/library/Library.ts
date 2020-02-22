import { AclPropectedResource } from "../acl/AclProtectedResource";
import { Identity } from "../acl/Identity";
import { Document } from "./Document";
import { AccessControlList } from "../acl/AccessControlList";
import { Token } from "../acl/Token";
import { EventBus } from "../events/EventBus";
import { ResourceAccessRequestEvent } from "../events/ResourceAccessRequestEvent";
import { EventListener } from "../events/EventListener";
import { ResourceAccessRequestAcceptEvent } from "../events/ResourceAccessRequestAcceptEvent";
import { ResourceAccessRequestRejectEvent } from "../events/ResourceAccessRequestRejectEvent";

class DocumentIdentity implements Identity {

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

export class Library implements AclPropectedResource, EventListener {

    private readonly eventBus: EventBus;
    private readonly documents: Array<Document>;
    private readonly acl: AccessControlList;

    constructor(eventBus: EventBus) {
        this.documents = new Array<Document>();
        this.acl = new AccessControlList();

        this.eventBus = eventBus;
        this.eventBus.subscribe(this);
    }

    // FIXME this is pretty generic, and could be moved into a separate class for composition

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

    // UNTIL THIS POINT

    addDocument(token: Token, document: Document) {
        this.documents.push(document);
        this.acl.grantAccess(token.id(), document);
    }

    getDocumentById(token: Token, documentId: string): Document {

        if (!this.acl.hasAccess(token.id(), new DocumentIdentity(documentId))) {
            throw new Error("Access to document failed due to ACL mismatch");
        }

        return this.documents.find(document => document.id() === documentId);
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