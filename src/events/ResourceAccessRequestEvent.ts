import { Event } from "./Event";
import { Identity } from "src/acl/Identity";
import { Token } from "src/acl/Token";

export class ResourceAccessRequestEvent implements Event{

    private readonly claimer: Token;
    private readonly resource: Identity;

    constructor(claimer: Token, resource: Identity){
        this.claimer = claimer;
        this.resource = resource;
    }

    getClaimer(): Token{
        return this.claimer;
    }

    getResource(): Identity {
        return this.resource;
    }

}