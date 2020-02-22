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

}

export class UserToken implements Token {
    
    private readonly user: User;

    constructor(user: User){
        this.user = user;
    }
    
    id(): Identity {
        return this.user;
    }  

}