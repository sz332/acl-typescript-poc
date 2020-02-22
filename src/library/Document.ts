import { Identity } from "../acl/Identity";

export class Document implements Identity {

    private readonly _id: string;
    private readonly _title: string;

    constructor(id: string, title: string) {
        this._id = id;
        this._title = title;
    }

    id(): string {
        return this._id;
    }

    toString(): string {
        return this._id + " = " + this._title;
    }

}