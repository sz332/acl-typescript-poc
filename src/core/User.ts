import { Identity } from "../acl/Identity";
import { uuid } from 'uuidv4';

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

