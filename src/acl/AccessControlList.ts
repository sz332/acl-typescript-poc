import { Identity } from "./Identity";
import { Dictionary } from "../core/Dictionary";

class AccessList {

    private readonly owner: Identity;
    private readonly grants: Array<Identity>;

    constructor(owner: Identity) {
        this.owner = owner;
        this.grants = new Array<Identity>();
    }

    add(identity: Identity): void {
        this.grants.push(identity);
    }

    remove(identity: Identity): void {
        for (let i = 0; i < this.grants.length; i++) {
            if (this.grants[i].equalsTo(identity)) {
                this.grants.splice(i, 1);
                return;
            }
        }
    }

    hasAccess(identity: Identity): boolean {
        if (this.owner.equalsTo(identity)) {
            return true;
        }

        for (let g of this.grants) {
            if (g.equalsTo(identity)) {
                return true;
            }
        }

        return false;
    }

}


export class AccessControlList {

    private readonly acl: Dictionary<AccessList>;

    constructor() {
        this.acl = new Dictionary<AccessList>();
    }

    grantAccess(identity: Identity, resource: Identity): void {

        let resourceId = identity.id();

        if (!this.acl.containsKey(resourceId)) {
            this.acl.add(resourceId, new AccessList(identity));
        }

        let list = this.acl.value(resourceId);
        list.add(resource);
    }

    revokeAccess(identity: Identity, resource: Identity): void {
        let resourceId = identity.id();
        let list = this.acl.value(resourceId);
        list.remove(identity);
    }


    hasAccess(identity: Identity, resource: Identity): boolean {
        let resourceId = identity.id();
        let list = this.acl.value(resourceId);
        return list.hasAccess(identity);
    }

}