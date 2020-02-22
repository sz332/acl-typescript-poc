import { Resource } from "./Resource";
import { Identity } from "./Identity";
import { Token } from "./Token";

export interface AclPropectedResource extends Resource{

    requestAccess(token: Token, resource: Identity): void;
    grantAccess(token: Token, identity: Identity, resource: Identity): void;
    revokeAccess(token: Token, identity: Identity, resource: Identity): void;

}