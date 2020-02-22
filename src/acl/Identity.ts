export interface Identity {

    id(): string;
    equalsTo(other: Identity): boolean;

}