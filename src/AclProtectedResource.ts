import { Resource } from "./Resource";
import { Identity } from "./Identity";

export interface AclPropectedResource extends Resource{

    grantAccess(identity: Identity, resource: Identity): void;
    revokeAccess(identity: Identity, resource: Identity): void;

}