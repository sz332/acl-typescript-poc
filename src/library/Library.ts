import { AclPropectedResource } from "../acl/AclProtectedResource";
import { Identity } from "../acl/Identity";
import { Document } from "./Document";
import { AccessControlList } from "../acl/AccessControlList";
import { Token } from "../acl/Token";
import { EventBus } from "../events/EventBus";
import { ResourceAccessRequestEvent } from "src/events/ResourceAccessRequestEvent";

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

export class Library implements AclPropectedResource {

    private readonly eventBus: EventBus;
    private readonly documents: Array<Document>;
    private readonly acl: AccessControlList;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
        this.documents = new Array<Document>();
        this.acl = new AccessControlList();
    }

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
        this.eventBus.handle(new ResourceAccessRequestEvent(token, resource));    
    }

    grantAccess(token: Token, identity: Identity, resource: Identity): void {
        this.acl.grantAccess(identity, resource);
    }

    revokeAccess(token: Token, identity: Identity, resource: Identity): void {
        this.acl.revokeAccess(identity, resource);
    }

}