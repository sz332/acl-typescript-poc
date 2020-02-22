import { User } from "./User";
import { Token } from "../acl/Token";
import { Identity } from "../acl/Identity";

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