import { Event } from "./Event";
import { Identity } from "src/acl/Identity";
import { Token } from "src/acl/Token";

export class ResourceAccessRequestEvent implements Event{

    private readonly owner: Identity;
    private readonly claimer: Identity;
    private readonly resource: Identity;

    constructor(owner: Identity, claimer: Identity, resource: Identity){
        this.owner = owner;
        this.claimer = claimer;
        this.resource = resource;
    }

    getOwner(): Identity {
        return this.owner;
    }

    getClaimer(): Identity{
        return this.claimer;
    }

    getResource(): Identity {
        return this.resource;
    }

}