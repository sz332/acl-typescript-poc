import { AclPropectedResource } from "./AclProtectedResource";
import { Identity } from "./Identity";
import { Document } from "./Document";
import { AccessControlList } from "./AccessControlList";

class DocumentIdentity implements Identity {

    private readonly _id: string;

    constructor(id: string) {
        this._id = id;
    }

    id(): string {
        return this._id;
    }

}

export class Library implements AclPropectedResource {

    private readonly documents: Array<Document>;
    private readonly acl: AccessControlList;

    constructor() {
        this.documents = new Array<Document>();
        this.acl = new AccessControlList();
    }

    addDocument(document: Document) {
        this.documents.push(document);
    }

    getDocumentById(identity: Identity, documentId: string): Document {

        if (!this.acl.hasAccess(identity, new DocumentIdentity(documentId))) {
            throw new Error("Access to document failed due to ACL mismatch");
        }

        return this.documents.find(document => document.id() === documentId);
    }

    grantAccess(identity: Identity, resource: Identity): void {
        this.acl.grantAccess(identity, resource);
    }

    revokeAccess(identity: Identity, resource: Identity): void {
        this.acl.revokeAccess(identity, resource);
    }

}