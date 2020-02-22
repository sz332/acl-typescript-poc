import { AclProtectedResource } from "../acl/AclProtectedResource";
import { EventBus } from "../events/EventBus";
import { Document } from "./Document";

export class Library extends AclProtectedResource<Document> {

    constructor(eventBus: EventBus) {
        super(eventBus);
    }

}