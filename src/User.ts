import { Identity } from "./acl/Identity";
import { uuid } from 'uuidv4';
import { Token } from "./acl/Token";

export class User implements Identity {

    readonly name: string;
    readonly _id: string;

    constructor(name: string) {
        this.name = name;
        this._id = uuid();
    }

    id(): string {
        return this._id;
    }

    equalsTo(other: Identity): boolean {
        return this._id === other.id();
    }

}

export class UserToken implements Token {
    
    private readonly user: User;

    constructor(user: User){
        this.user = user;
    }
    
    id(): Identity {
        return this.user;
    }  

    equalsTo(other: Identity): boolean {
        return this.user.id() === other.id();
    }

}