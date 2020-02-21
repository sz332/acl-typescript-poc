import { AclPropectedResource } from "./AclProtectedResource";
import { Identity } from "./Identity";
import { Dictionary } from "./Dictionary";

export class AccessControlList implements AclPropectedResource {

    private readonly acl: Dictionary<Array<Identity>>;

    constructor() {
        this.acl = new Dictionary<Array<Identity>>();
    }

    grantAccess(identity: Identity, resource: Identity): void {

        let id = identity.id();

        if (!this.acl.containsKey(id)) {
            let array = new Array<Identity>();
            this.acl.add(id, array);
        }

        let list = this.acl.value(id);
        list.push(resource);
    }

    hasAccess(identity: Identity, resource: Identity): boolean {
        let id = identity.id();
        let list = this.acl.value(id);

        for (let i = 0; i < list.length; i++) {
            if (list[i].id() === resource.id()) {
                return true;
            }
        }

        return false;
    }

    revokeAccess(identity: Identity, resource: Identity): void {
        let id = identity.id();
        let list = this.acl.value(id);

        for (let i = 0; i < list.length; i++) {
            if (list[i].id() === resource.id()) {
                list.splice(i, 1);
                return;
            }
        }
    }





}