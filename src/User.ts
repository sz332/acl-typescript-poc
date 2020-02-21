import { Identity } from "./Identity";
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

}