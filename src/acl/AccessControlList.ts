import { Identity } from "./Identity";
import { Dictionary } from "../core/Dictionary";

class AccessList {

    private readonly owner: Identity;
    private readonly grants: Array<Identity>;

    constructor(owner: Identity) {
        this.owner = owner;
        this.grants = new Array<Identity>();
    }

    getOwner(): Identity {
        return this.owner;
    }

    isOwner(identity: Identity): boolean{
        return this.owner.equalsTo(identity);
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

    isOwner(claimer: Identity, resource: Identity): boolean {
        let resourceOwner = this.getOwner(resource);
        return resourceOwner.equalsTo(claimer);
    }

    getOwner(resource: Identity): Identity {
        let resourceId = resource.id();

        if (!this.acl.containsKey(resourceId)) {
            throw new Error("Resource not found with id " + resourceId);
        }

        let accessList = this.acl.value(resourceId);
        return accessList.getOwner();
    }

    grantAccess(identity: Identity, resource: Identity): void {

        let resourceId = resource.id();

        if (!this.acl.containsKey(resourceId)) {
            this.acl.add(resourceId, new AccessList(identity));
        }

        let accessList = this.acl.value(resourceId);
        accessList.add(resource);
    }

    revokeAccess(identity: Identity, resource: Identity): void {
        let resourceId = resource.id();
        let accessList = this.acl.value(resourceId);
        accessList.remove(identity);
    }

    hasAccess(identity: Identity, resource: Identity): boolean {
        let resourceId = resource.id();
        let accessList = this.acl.value(resourceId);
        return accessList.hasAccess(identity);
    }

    hasResource(resource: Identity): boolean {
        let resourceId = resource.id();
        return this.acl.containsKey(resourceId);
    }

}